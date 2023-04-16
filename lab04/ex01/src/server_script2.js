import http from "node:http";
import { URL } from "node:url";
import { exec } from "node:child_process";
import fs from "node:fs/promises";

/**
 * Handles incoming requests.
 *
 * @param {http.IncomingMessage} request - Input stream — contains data received from the browser, e.g., encoded contents of HTML form fields.
 * @param {http.ServerResponse} response - Output stream — put in it data that you want to send back to the browser.
 * The answer sent by this stream must consist of two parts: the header and the body.
 * <ul>
 *  <li>The header contains, among others, information about the type (MIME) of data contained in the body.
 *  <li>The body contains the correct data, e.g. a form definition.
 * </ul>
 * @author Paweł Jaśkowiec <ppjaskowiec@student.agh.edu.pl>
 */

function requestListener(request, response) {
  console.log("--------------------------------------");
  console.log(`The relative URL of the current request: ${request.url}`);
  console.log(`Access method: ${request.method}`);
  console.log("--------------------------------------");
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (url.pathname === "/" && request.method === "GET") {
    response.write(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Server Script 2</title>
  </head>
  <body>
    <main>
      <h1>Server Script 2</h1>
      <form method="GET" action="/submit">
        <label for="action">Choose an action:</label>
        <select name="action" id="action">
          <option value="">—</option>
          <option value="sync">sync</option>
          <option value="async">async</option>
        </select>
        <br>
        <label for="commands">Enter system commands (only when action is '—'):</label>
        <textarea name="commands" id="commands" rows="4" cols="50"></textarea>
        <br>
        <input type="submit" value="Submit">
      </form>
    </main>
  </body>
</html>`);
    response.end();
  } else if (url.pathname === "/submit" && request.method === "GET") {
    const action = url.searchParams.get("action");
    const commands = url.searchParams.get("commands");

    if (action === "sync" || action === "async") {
      const counterFile = "counter.txt";

      const readAndUpdateCounter = async () => {
        try {
          let counter;

          // Check if the counter file exists
          try {
            await fs.access(counterFile);
          } catch (err) {
            // If the file does not exist, create it and set the initial counter to 0
            await fs.writeFile(counterFile, "0", "utf-8");
          }

          // Read the current counter value
          counter = await fs.readFile(counterFile, "utf-8");
          counter = parseInt(counter, 10) + 1;

          // Update the counter value
          await fs.writeFile(counterFile, counter.toString(), "utf-8");
          return counter;
        } catch (err) {
          console.error(`Error: ${err}`);
          return -1;
        }
      };

      const processCounter = async () => {
        const counterValue = await readAndUpdateCounter();
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        response.write(
          `<html><body><p>Liczba uruchomień: ${counterValue}</p></body></html>`
        );
        response.end();
      };

      if (action === "sync") {
        processCounter();
      } else {
        process.nextTick(() => {
          processCounter();
        });
      }
    } else if (commands) {
      exec(commands, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error}`);
          response.writeHead(500, {
            "Content-Type": "text/html; charset=utf-8",
          });
          response.write(`<html><body><pre>${error}</pre></body></html>`);
          response.end();
        } else {
          response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
          });
          response.write(
            `<html><body><pre>${stdout}${stderr}</pre></body></html>`
          );
          response.end();
        }
      });
    } else {
      response.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
      response.write(
        `<html><body><p>Error 400: Bad Request - Invalid action or missing commands.</p></body></html>`
      );
      response.end();
    }
  } else {
    response.writeHead(501, { "Content-Type": "text/plain; charset=utf-8" });
    response.write("Error 501: Not implemented");
    response.end();
  }
}

/**
 * The main entry point of the server application.
 * It creates an HTTP server and starts listening on port 8000.
 */
const server = http.createServer(requestListener);
server.listen(8000);
console.log("The server was started on port 8000");
console.log('To stop the server, press "CTRL + C"');
