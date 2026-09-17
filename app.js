const apiUrl = "https://geljnhjhktydutfoujqo.supabase.co/rest/v1"
const apiKey = "sb_publishable_dHy6cc66QpvaMCZ3-rKrCg_6DJ9YP4C"

const getUsers = async () => {
    console.log("Testing Get Users")
    fetch(`${apiUrl}/users?apikey=${apiKey}`).then(response => console.log(response));
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