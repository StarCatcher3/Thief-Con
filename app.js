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
    }
  }));
  if (!transferred) {
    alert("₮Ⱨ₳₦₭ ɎØɄ ₣ØⱤ ɎØɄⱤ ₥Ɇ₴₴₳₲Ɇ");
  }
}

const tacpProceed = () => {
  const playerId = window.localStorage.getItem("player_id");
  fetch(`${apiUrl}/clues?id=eq.${playerId}&hhp=is.null`, { method: 'PATCH', headers: {
    'Content-Type': 'application/json',
    'apikey': apiKey,
    'Prefer': 'return=representation'
  }, body: JSON.stringify({ hhp: getTime() }) }).then(r => r.json().then(d => window.location.href = "redirect.html?redirect=hhp.html"));
}

const getProgressId = (playerId) => {
  fetch(`${apiUrl}/clues?id=eq.${playerId}&apikey=${apiKey}`).then(response => response.json().then(data => {
    if (data.length > 0) {
      console.log("Player Data: ", data[0]);
      if (data[0].hlp == null) {
        return 0;
      } else if (data[0].tacp == null && data[0].kbpp == null) {
        return 1;
      } else if (data[0].kbpp != null && data[0].tacp == null) {
        return 2;
      } else if (data[0].kbpp == null && data[0].tacp != null && data[0].hhp == null) {
        return 3;
      } else if (data[0].kbpp != null && data[0].tacp != null && data[0].hhp == null) {
        return 4;
      } else if (data[0].kbpp == null && data[0].tacp != null && data[0].hhp != null) {
        return 5;
      } else if (data[0].kbpp != null && data[0].tacp != null && data[0].hhp != null && data[0].kmp == null) {
        return 6;
      } else if (data[0].kmp != null && data[0].tafp == null) {
        return 7;
      } else if (data[0].tafp != null && data[0].knp == null) {
        return 8;
      } else if (data[0].knp != null) {
        return 9;
      }
    } else {
      return 0;
    }
  }));
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
      }
      document.getElementById("nav-bar-bottom").innerHTML = newNavBarText;
      window.localStorage.setItem("navbar", newNavBarText);
    }
  }));
});
