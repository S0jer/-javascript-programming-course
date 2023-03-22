
function readAndLogValues() {
    for (let i = 0; i < 4; i++) {
        const value = window.prompt("Wprowadź wartość:");
        const type = typeof value;
        console.log(`${value}:${type}`);
    }
  }

  function printValues() {
    const poleTekstowe = document.forms[0].elements["pole_tekstowe"].value;
    const poleLiczbowe = document.forms[0].elements["pole_liczbowe"].value;
    console.log(`${poleTekstowe}:${typeof poleTekstowe}`);
    console.log(`${poleLiczbowe}:${typeof poleLiczbowe}`);
  }