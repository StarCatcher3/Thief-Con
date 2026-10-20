const apiUrl = "https://geljnhjhktydutfoujqo.supabase.co/rest/v1"
const apiKey = "sb_publishable_dHy6cc66QpvaMCZ3-rKrCg_6DJ9YP4C"

const getClues = async () => {
    console.log("Testing Get Clues")
    fetch(`${apiUrl}/clues?apikey=${apiKey}`).then(response => response.json().then(data => console.log(data)));
}

const addUser = async (username, password) => {
  connection.query('INSERT INTO users (username, password, step) VALUES (?, ?, ?)', [username, password, 0], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      return;
    }
    console.log('Query results:', results);
  });
}

const getTime = () => {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}

const indexSubmit = () => {
  const username = document.getElementById("hlp-username").value.toLowerCase();
  const password = document.getElementById("hlp-password").value.toLowerCase();
  fetch(`${apiUrl}/clues?hlp_username=eq.${username}&hlp_password=eq.${password}&apikey=${apiKey}`).then(response => response.json().then(data => {
    if (data.length > 0) {
      window.localStorage.setItem("player_id", data[0].id);
      if (data[0].hlp == null ) {
        fetch(`${apiUrl}/clues?id=eq.${data[0].id}`, { method: 'PATCH', headers: {
          'Content-Type': 'application/json',
          'apikey': apiKey,
          'Prefer': 'return=representation'
        }, body: JSON.stringify({ hlp: getTime() }) }).then(r => r.json().then(d => window.location.href = "redirect.html?redirect=hlp.html"));
      } else {
        window.location.href = "redirect.html?redirect=hlp.html"
      }
    } else if (username == "fence" && password == "ray26") {
      window.location.href = "redirect.html?redirect=admin-dash.html"
    } else {
      document.getElementById("hlp-username").value = "";
      document.getElementById("hlp-password").value = "";
      alert("Thank you for your message! We will get back to you soon.");
    }
  }));
}

const hlpSubmit = () => {
  const kbppValue = document.getElementById("kbpp-value").value;
  const tacpCode = document.getElementById("tacp-code").value;
  document.getElementById("kbpp-value").value = "";
  document.getElementById("tacp-code").value = "";
  let transferred = false;
  const playerId = window.localStorage.getItem("player_id");
  fetch(`${apiUrl}/clues?id=eq.${playerId}&kbpp_value=eq.${kbppValue}&apikey=${apiKey}`).then(response => response.json().then(data => {
    if (data.length > 0) {
      transferred = true;
      if (data[0].kbpp == null ) {
        fetch(`${apiUrl}/clues?id=eq.${playerId}`, { method: 'PATCH', headers: {
          'Content-Type': 'application/json',
          'apikey': apiKey,
          'Prefer': 'return=representation'
        }, body: JSON.stringify({ kbpp: getTime() }) }).then(r => r.json().then(d => window.location.href = "redirect.html?redirect=kbpp.html"));
      } else {
        window.location.href = "redirect.html?redirect=kbpp.html"
      }
    }
  }));
  fetch(`${apiUrl}/clues?id=eq.${playerId}&tacp_code=eq.${tacpCode}&apikey=${apiKey}`).then(response => response.json().then(data => {
    if (data.length > 0) {
      transferred = true;
      if (data[0].tacp == null ) {
        fetch(`${apiUrl}/clues?id=eq.${playerId}`, { method: 'PATCH', headers: {
          'Content-Type': 'application/json',
          'apikey': apiKey,
          'Prefer': 'return=representation'
        }, body: JSON.stringify({ tacp: getTime() }) }).then(r => r.json().then(d => window.location.href = "redirect.html?redirect=tacp.html"));
      } else {
        window.location.href = "redirect.html?redirect=tacp.html"
      }
    } else {
      if (!transferred) {
        alert("₮Ⱨ₳₦₭ ɎØɄ ₣ØⱤ ɎØɄⱤ ₥Ɇ₴₴₳₲Ɇ");
      }
    }
  }));
  
}

const tacpProceed = () => {
  const playerId = window.localStorage.getItem("player_id");
  fetch(`${apiUrl}/clues?id=eq.${playerId}&hhp=is.null`, { method: 'PATCH', headers: {
    'Content-Type': 'application/json',
    'apikey': apiKey,
    'Prefer': 'return=representation'
  }, body: JSON.stringify({ hhp: getTime() }) }).then(r => r.json().then(d => window.location.href = "redirect.html?redirect=hhp.html"));
}

const hhpSubmit = () => {
  const playerId = window.localStorage.getItem("player_id");
    if (promoCode.value.trim() == "") {
        alert(hireName + " is not accepting new clients at this time. Please try again later.");
        cancelHire();
    } else if (hireName == "SNIPEY-JOHN") {
      fetch(`${apiUrl}/clues?id=eq.${playerId}&kmp_promo=eq.${promoCode.value.toUpperCase()}&apikey=${apiKey}`).then(response => response.json().then(data => {
        if (data.length > 0) {
          if (data[0].kmp == null ) {
            fetch(`${apiUrl}/clues?id=eq.${playerId}`, { method: 'PATCH', headers: {
              'Content-Type': 'application/json',
              'apikey': apiKey,
              'Prefer': 'return=representation'
            }, body: JSON.stringify({ kmp: getTime() }) }).then(r => r.json().then(d => window.location.href = "redirect.html?redirect=kmp.html"));
          } else {
            window.location.href = "redirect.html?redirect=kmp.html"
          }
        } else {
          alert("Invalid promo code for " + hireName + ". Please try again.");
          promoCode.value = "";
        }
      }));
    } else {
      alert("Invalid promo code for " + hireName + ". Please try again.");
      promoCode.value = "";
    }
}

const kmpSubmit = () => {
  const playerId = window.localStorage.getItem("player_id");
  const tafpPin = document.getElementById("tafp-pin").value;
  fetch(`${apiUrl}/clues?id=eq.${playerId}&tafp_pin=eq.${tafpPin.toUpperCase()}&apikey=${apiKey}`).then(response => response.json().then(data => {
    if (data.length > 0) {
      if (data[0].tafp == null ) {
        fetch(`${apiUrl}/clues?id=eq.${playerId}`, { method: 'PATCH', headers: {
          'Content-Type': 'application/json',
          'apikey': apiKey,
          'Prefer': 'return=representation'
        }, body: JSON.stringify({ tafp: getTime() }) }).then(r => r.json().then(d => window.location.href = "redirect.html?redirect=tafp.html"));
      } else {
        window.location.href = "redirect.html?redirect=tafp.html"
      }
    } else {
      alert("Invalid PIN Code. Please try again.");
      document.getElementById("tafp-pin").value = "";
    }
  }));
}

const tafpProceed = () => {
  const playerId = window.localStorage.getItem("player_id");
  fetch(`${apiUrl}/clues?id=eq.${playerId}&knp=is.null`, { method: 'PATCH', headers: {
    'Content-Type': 'application/json',
    'apikey': apiKey,
    'Prefer': 'return=representation'
  }, body: JSON.stringify({ knp: getTime() }) }).then(r => r.json().then(d => window.location.href = "redirect.html?redirect=knp.html"));
}

document.addEventListener("DOMContentLoaded", function () {
  const playerId = window.localStorage.getItem("player_id");
  document.getElementById("nav-bar-bottom").innerHTML = window.localStorage.getItem("navbar") || `
          <a href="#" class="w3-button" style="flex:1">Home</a>
          <a href="#plans" class="w3-button" style="flex:1">Plans</a>
          <a href="#about" class="w3-button" style="flex:1">About</a>
          <a href="#contact" class="w3-button" style="flex:1">Contact</a>
        `;
  fetch(`${apiUrl}/clues?id=eq.${playerId}&apikey=${apiKey}`).then(response => response.json().then(data => {
    if (data.length > 0) {
      let newNavBarText = `<a href="index.html" class="w3-button" style="flex:1">Home</a>`;
      if (data[0].hlp == null) {
        document.getElementById("nav-bar-bottom").innerHTML = `
          <a href="#" class="w3-button" style="flex:1">Home</a>
          <a href="#plans" class="w3-button" style="flex:1">Plans</a>
          <a href="#about" class="w3-button" style="flex:1">About</a>
          <a href="#contact" class="w3-button" style="flex:1">Contact</a>
        `;
      } else {
        newNavBarText += `<a href="hlp.html" class="w3-button" style="flex:1; background-color: black; color: green;">Hacked</a>`;
        if (data[0].kbpp != null) {
          newNavBarText += `<a href="kbpp.html" class="w3-button" style="flex:1; background-color: beige; color: gray;">Q-A-None</a>`;
        }
        if (data[0].tacp != null) {
          newNavBarText += `<a href="tacp.html" class="w3-button" style="flex:1; background-color: black; color: green;">Hacké</a>`;
        }
        if (data[0].hhp != null) {
          newNavBarText += `<a href="hhp.html" class="w3-button" style="flex:1; background-color: black; color: white;">Hitman</a>`;
        }
        if (data[0].kmp != null) {
          newNavBarText += `<a href="kmp.html" class="w3-button" style="flex:1;">News</a>`;
        }
        if (data[0].tafp != null) {
          newNavBarText += `<a href="tafp.html" class="w3-button" style="flex:1; background-color: #17365d; color: white;">Flights</a>`;
        }
        if (data[0].knp != null) {
          newNavBarText += `<a href="knp.html" class="w3-button" style="flex:1;">Booked</a>`;
        }
      }
      symbolValue = data[0].tafp_pin;
      page = window.location.href.split("/").findLast(x => true).split("#")[0];
      if (page == "hlp.html") {
        if (!symbolValue.includes("T")) {
          document.getElementById("t-image").removeAttribute("hidden");
          document.getElementById("t-color").setAttribute("style", "color:red");
        }
        if (!symbolValue.includes("H")) {
          document.getElementById("h-image").removeAttribute("hidden");
          document.getElementById("h-color").setAttribute("style", "color:#1af0dc");
        }
      } else if (page == "kbpp.html") {
        document.getElementById("personal-promo-code").innerText = data[0].kmp_promo;
        if (!symbolValue.includes("I")) {
          document.getElementById("i-image").removeAttribute("hidden");
          document.getElementById("i-text").innerText = "";
        }
        if (!symbolValue.includes("C")) {
          document.getElementById("c-image").removeAttribute("hidden");
          document.getElementById("c-text").innerHTML = `<em style="color: #B89968">Clean</em>`;
        }
      } else if (page == "tacp.html") {
        if (!symbolValue.includes("F")) {
          document.getElementById("f-image").removeAttribute("hidden");
          document.getElementById("f-color").setAttribute("style", "color:green");
        }
        if (!symbolValue.includes("N")) {
          document.getElementById("n-image").removeAttribute("hidden");
          document.getElementById("n-glitch").setAttribute("class", "glitch");
        }
      } else if (page == "hhp.html") {
        if (!symbolValue.includes("O")) {
          document.getElementById("o-button").setAttribute("onclick", "hireButtonClick('CHoKE-OUT-RAY')");
        }
        if (!symbolValue.includes("E")) {
          document.getElementById("e-trigger").setAttribute("onclick", "document.getElementById('e-image').removeAttribute('hidden');");
        }
      } else if (page == "kmp.html") {
        symbols = document.getElementById("symbols");
        symbols.innerHTML = "";
        symbolValue.split("").forEach(letter => {
          symbols.innerHTML += `<img style="max-width: 80px; max-height: 80px; padding: 10px; margin: 10px;" src="public/symbol (${letter}).jpg">`
        });
      }
      document.getElementById("nav-bar-bottom").innerHTML = newNavBarText;
      window.localStorage.setItem("navbar", newNavBarText);
    }
  }));
});
