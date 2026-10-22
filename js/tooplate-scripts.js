const width_threshold = 480;
const apiUrl = "https://geljnhjhktydutfoujqo.supabase.co/rest/v1"
const apiKey = "sb_publishable_dHy6cc66QpvaMCZ3-rKrCg_6DJ9YP4C"

const timeDataPoints = 15;
let progressData = [0, 0, 0, 0, 0, 0, 0, 0];
let clueList = [[], [], [], [], [], [], [], []]
let playerNames = ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5", "Player 6", "Player 7", "Player 8"];
let clueData = [[], [], [], [], [], [], [], []]
let timeLabels = []

const resetData = () => {
  if (confirm("Are you sure you want to reset all the player progress data? This is irreversible!")) {
    fetch(`${apiUrl}/clues?id=not.is.null`, { method: 'PATCH', headers: {
          'Content-Type': 'application/json',
          'apikey': apiKey,
          'Prefer': 'return=representation'
        }, body: JSON.stringify({ hlp: null, kbpp: null, tacp: null, hhp: null, kmp: null, tafp: null, knp: null }) }).then(r => r.json().then(d => {
          alert("Data Reset!");
          window.reloadPage();
    }));
  }
}

const updateData = async () => {
    fetch(`${apiUrl}/clues?apikey=${apiKey}&order=id`).then(response => response.json().then(data => {
      const playerData = data.map(player => {
        const clueValues = [player.hlp_username, player.hlp_password, player.kbpp_value, player.tacp_code, player.kmp_promo, player.tafp_pin, player.kbpp_clue, player.kbpp_player, player.tacp_clue, player.tacp_player];
        const cluesList = [player.hlp, player.kbpp, player.tacp, player.hhp, player.kmp, player.tafp, player.knp];
        const clueListBool = cluesList.map(clue => clue ? true : false);
        const cluesFound = cluesList.filter(clue => clue !== null)
                                  .map(time => {
                                    const date = new Date();
                                    date.setHours(...time.split(":").map(Number), 0);
                                    return date;
                                  });
        const cluesFoundCount = cluesFound.length;
        return {name: player.hlp_username, clueCount: cluesFoundCount, clueTimes: cluesFound, clueList: clueListBool, clueValues: clueValues};
      });
      playerNames = playerData.map(player => player.name);
      progressData = playerData.map(player => player.clueCount);
      const allClueTimes = playerData.flatMap(player => player.clueTimes).filter(time => time != null);
      if (allClueTimes.length > 0) {
        const clueTimes = playerData.map(player => player.clueTimes);
        const timeRange = [Math.min(...allClueTimes), Math.max(...allClueTimes)];
        const timeStep = Math.max((timeRange[1] - timeRange[0]) / timeDataPoints, 1);

        timeLabels = [];
        let clueTimeData = [];
        const date = new Date(timeRange[0] - timeStep);
        timeLabels.push(`${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`)
        clueTimeData.push(clueTimes.map(c => 0));
        for (time = timeRange[0]; time <= timeRange[1]; time += timeStep) {
          const date = new Date(time);
          timeLabels.push(`${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`);
          clueTimeData.push(clueTimes.map(c => c.filter(t => t <= time + timeStep).length));
        }
        clueData = clueTimeData[0].map((_, colIndex) =>
            clueTimeData.map(row => row[colIndex])
        );
      } else {
        timeLabels = ["00:00:00", "12:00:00"]
        clueData = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
      }

      drawLineChart(); // Line Chart
      drawBarChart(); // Bar Chart
      
      playerClues = playerData.map(player => player.clueList);
      playerClueValues = playerData.map(player => player.clueValues);
      for (i = 0; i < playerNames.length; i++) {
        for (j = 0; j < playerClues[i].length; j++) {
          pageList = document.getElementById(`page-${j}-list`)
          if (i == 0) {
            pageList.innerHTML = "";
          }
          if (playerClues[i][j]) {
            pageList.innerHTML += (pageList.innerHTML == "" ? "" :  ", ") + playerNames[i];
          }
        }
        document.getElementById(`player-${i}-name`).innerHTML = playerNames[i];
        if (!playerClues[i][0]) {
          document.getElementById(`player-${i}-clue1`).innerHTML = `Hacking the Mainframe Document<br>username: ${playerClueValues[i][0]}`;
          document.getElementById(`player-${i}-clue2`).innerHTML = `Hacking the Mainframe Document<br>password: ${playerClueValues[i][1]}`;
          document.getElementById(`player-${i}-step`).innerHTML = "Hacked Landing Page";
        } else if (!playerClues[i][1] && !playerClues[i][2]) {
          document.getElementById(`player-${i}-clue1`).innerHTML = `${playerClueValues[i][8]}<br>Player: ${playerClueValues[i][9]}<br>Safe Code: ${playerClueValues[i][3]}`;
          document.getElementById(`player-${i}-clue2`).innerHTML = `Figure out who has your same R Number<br>${playerClueValues[i][6]}<br>Player: ${playerClueValues[i][7]}<br>Group Value: ${playerClueValues[i][2]}`;
          document.getElementById(`player-${i}-step`).innerHTML = "French Hacked Landing Page";
        } else if (!playerClues[i][1] && playerClues[i][2] && !playerClues[i][3]) {
          document.getElementById(`player-${i}-clue1`).innerHTML = `Figure out who has your same R Number<br>${playerClueValues[i][6]}<br>Player: ${playerClueValues[i][7]}<br>Group Value: ${playerClueValues[i][2]}`;
          document.getElementById(`player-${i}-clue2`).innerHTML = "French Instructions:<br>Select Cambriolage Image<br>Insert 'Professor Getsshot' into Name<br>Take Pro Package";
          document.getElementById(`player-${i}-step`).innerHTML = "Q-A-None Page";
        } else if (playerClues[i][1] && !playerClues[i][2]) {
          document.getElementById(`player-${i}-clue1`).innerHTML = `${playerClueValues[i][8]}<br>Player: ${playerClueValues[i][9]}<br>Safe Code: ${playerClueValues[i][3]}`;
          document.getElementById(`player-${i}-clue2`).innerHTML = "French Instructions:<br>Select Cambriolage Image<br>Insert 'Professor Getsshot' into Name<br>Take Pro Package";
          document.getElementById(`player-${i}-step`).innerHTML = "French Hacked Landing Page";
        } else if (!playerClues[i][1] && playerClues[i][2] && playerClues[i][3]) {
          document.getElementById(`player-${i}-clue1`).innerHTML = `Figure out who has your same R Number<br>${playerClueValues[i][6]}<br>Player: ${playerClueValues[i][7]}<br>Group Value: ${playerClueValues[i][2]}`;
          document.getElementById(`player-${i}-clue2`).innerHTML = `Q-A-None Page Related Organisations<br>Promo Code: ${playerClueValues[i][4]}`;
          document.getElementById(`player-${i}-step`).innerHTML = "Q-A-None";
        } else if (playerClues[i][1] && playerClues[i][2] && !playerClues[i][3]) {
          document.getElementById(`player-${i}-clue1`).innerHTML = "French Instructions:<br>Select Cambriolage Image<br>Insert 'Professor Getsshot' into Name<br>Take Pro Package";
          document.getElementById(`player-${i}-clue2`).innerHTML = `Q-A-None Page Related Organisations<br>Promo Code: ${playerClueValues[i][4]}`;
          document.getElementById(`player-${i}-step`).innerHTML = "Hire A Hitman Page";
        } else if (!playerClues[i][4]) {
          document.getElementById(`player-${i}-clue1`).innerHTML = `Q-A-None Page Related Organisations<br>Promo Code: ${playerClueValues[i][4]}`;
          document.getElementById(`player-${i}-clue2`).innerHTML = `Symbols on all other pages related each to a letter<br>Powerpoint Presentation<br>Symbols PIN: ${playerClueValues[i][5]}`;
          document.getElementById(`player-${i}-step`).innerHTML = "News Article Page";
        } else if (!playerClues[i][5]) {
          document.getElementById(`player-${i}-clue1`).innerHTML = `Symbols on all other pages related each to a letter<br>Powerpoint Presentation<br>Symbols PIN: ${playerClueValues[i][5]}`;
          document.getElementById(`player-${i}-clue2`).innerHTML = `Flight: From Chicago to Paris<br>United Airlines on 10/24/2026<br>Flight Number: UA987`;
          document.getElementById(`player-${i}-step`).innerHTML = "Flight Website Page";
        }  else if (!playerClues[i][6]) {
          document.getElementById(`player-${i}-clue1`).innerHTML = `Flight: From Chicago to Paris<br>United Airlines on 10/24/2026<br>Flight Number: UA987`;
          document.getElementById(`player-${i}-clue2`).innerHTML = "No More Clues";
          document.getElementById(`player-${i}-step`).innerHTML = "United Tickets Receipt Page";
        } else {k =
          document.getElementById(`player-${i}-clue1`).innerHTML = "No More Clues";
          document.getElementById(`player-${i}-clue2`).innerHTML = "No More Clues";
          document.getElementById(`player-${i}-step`).innerHTML = "All Pages Found";
        }
      }
    }));
}

function drawLineChart() {
  if ($("#lineChart").length) {
    ctxLine = document.getElementById("lineChart").getContext("2d");
    optionsLine = {
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Clues"
            }
          }
        ]
      }
    };

    // Set aspect ratio based on window width
    optionsLine.maintainAspectRatio =
      $(window).width() < width_threshold ? false : true;

    configLine = {
      type: "line",
      data: {
        labels: timeLabels,
        datasets: [
          {
            label: playerNames[0],
            data: clueData[0],
            fill: false,
            borderColor: "rgba(255,99,132,1)",
            lineTension: 0.1
          },
          {
            label: playerNames[1],
            data: clueData[1],
            fill: false,
            borderColor: "rgba(54, 162, 235, 1)",
            lineTension: 0.1
          },
          {
            label: playerNames[2],
            data: clueData[2],
            fill: false,
            borderColor: "rgba(255, 206, 86, 1)",
            lineTension: 0.1
          },
          {
            label: playerNames[3],
            data: clueData[3],
            fill: false,
            borderColor: "rgba(75, 192, 192, 1)",
            lineTension: 0.1
          },
          {
            label: playerNames[4],
            data: clueData[4],
            fill: false,
            borderColor: "rgba(153, 102, 255, 1)",
            lineTension: 0.1
          },
          {
            label: playerNames[5],
            data: clueData[5],
            fill: false,
            borderColor: "rgba(255, 159, 64, 1)",
            lineTension: 0.1
          },
          {
            label: playerNames[6],
            data: clueData[6],
            fill: false,
            borderColor: "rgba(60, 200, 64, 1)",
            lineTension: 0.1
          },
          {
            label: playerNames[7],
            data: clueData[7],
            fill: false,
            borderColor: "rgba(80, 80, 80, 1)",
            lineTension: 0.1
          }
        ]
      },
      options: optionsLine
    };

    lineChart = new Chart(ctxLine, configLine);
  }
}

function drawBarChart() {
  if ($("#barChart").length) {
    ctxBar = document.getElementById("barChart").getContext("2d");

    optionsBar = {
      responsive: true,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: "Clues"
            }
          }
        ]
      }
    };

    optionsBar.maintainAspectRatio =
      $(window).width() < width_threshold ? false : true;

    configBar = {
      type: "bar",
      data: {
        labels: playerNames,
        datasets: [
          {
            label: "# of Clues Found",
            data: progressData,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(60, 200, 64, 0.2)",
              "rgba(80, 80, 80, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(60, 200, 64, 1)",
              "rgba(80, 80, 80, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: optionsBar
    };

    barChart = new Chart(ctxBar, configBar);
  }
}

function updateChartOptions() {
  updateData();
  if ($(window).width() < width_threshold) {
    if (optionsLine) {
      optionsLine.maintainAspectRatio = false;
    }
    if (optionsBar) {
      optionsBar.maintainAspectRatio = false;
    }
  } else {
    if (optionsLine) {
      optionsLine.maintainAspectRatio = true;
    }
    if (optionsBar) {
      optionsBar.maintainAspectRatio = true;
    }
  }
}

function updateLineChart() {
  if (lineChart) {
    lineChart.options = optionsLine;
    lineChart.update();
  }
}

function updateBarChart() {
  if (barChart) {
    barChart.options = optionsBar;
    barChart.update();
  }
}

function reloadPage() {
  setTimeout(function() {
    window.location.reload();
  }); // Reload the page so that charts will display correctly
}

function drawCalendar() {
  if ($("#calendar").length) {
    $("#calendar").fullCalendar({
      height: 400,
      events: [
        {
          title: "Meeting",
          start: "2018-09-1",
          end: "2018-09-2"
        },
        {
          title: "Marketing trip",
          start: "2018-09-6",
          end: "2018-09-8"
        },
        {
          title: "Follow up",
          start: "2018-10-12"
        },
        {
          title: "Team",
          start: "2018-10-17"
        },
        {
          title: "Company Trip",
          start: "2018-10-25",
		  end: "2018-10-27"
        },
        {
          title: "Review",
          start: "2018-11-12"
        },
        {
          title: "Plan",
          start: "2018-11-18"
        }
      ],
      eventColor: "rgba(54, 162, 235, 0.4)"
    });
  }
}
