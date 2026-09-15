const getUsers = async () => {
    fetch("/api/user").then(response => console.log(response));
}