const socket = io();

function subscribeToCity(id) {
    socket.emit("subscribe", id);
}

function unsubscribeToCity(id) {
    socket.emit("unsubscribe", id);
}

function showForecastsSection() {
    const forecastSection = document.querySelector("#forecast-section");
    forecastSection.classList = [];
}

function createTableCell(value) {
    const cell = document.createElement("td");
    cell.innerHTML = value;
    return cell;
}

function createCityRow(city) {
    const cityRow = document.createElement("tr");

    cityRow.appendChild(createTableCell(city.id));
    cityRow.appendChild(createTableCell(city.name));
    cityRow.appendChild(createTableCell(city.timezone));
    if (city.forecasts.length > 0) {
        cityRow.appendChild(createTableCell(city.forecasts[0].forecast));
    } else {
        cityRow.appendChild(createTableCell("No forecast yet!"));
    }

    const controllsCell = document.createElement("td");

    if (city.lockedSince === null) {
        const lockButton = document.createElement("button");
        lockButton.addEventListener("click", () => {
            fetch(`/api/city/${city.id}/lock`, {
                method: "PUT"
            }).then(res => {
                res.json().then(data => {
                    location.reload();
                })
            })
            .catch(err => {
                console.log(err);
            });
        });
        lockButton.classList = ["btn btn-warning"];
        lockButton.textContent = "Lock";
        controllsCell.appendChild(lockButton);
    } else {
        const lockButton = document.createElement("button");
        lockButton.addEventListener("click", () => {
            fetch(`/api/city/${city.id}/unlock`, {
                method: "PUT"
            }).then(res => {
                res.json().then(data => {
                    location.reload();
                })
            })
            .catch(err => {
                console.log(err);
            });
        });
        lockButton.classList = ["btn btn-warning"];
        lockButton.textContent = "Unlock";
        controllsCell.appendChild(lockButton);
    }

    const subscribeButton = document.createElement("button");
    subscribeButton.classList = ["btn btn-primary"];
    subscribeButton.textContent = "Subscribe";
    subscribeButton.id = `subscribe-${city.id}`
    subscribeButton.addEventListener("click", () => subscribeToCity(city.id));

    controllsCell.appendChild(subscribeButton);

    cityRow.appendChild(controllsCell);

    return cityRow;
}

function createForecastRow(forecast) {
    const row = document.createElement("tr");
    row.appendChild(createTableCell(forecast.id));
    row.appendChild(createTableCell(forecast.cityId));
    row.appendChild(createTableCell(forecast.forecast));
    row.appendChild(createTableCell(forecast.from));
    row.appendChild(createTableCell(forecast.to));
    return row
}

const tableBody = document.querySelector("#cities");
const forecastTable = document.querySelector("#forecasts");

fetch("/api/city").then(res => {
    res.json().then(data => {
        data.forEach(city => {
            tableBody.appendChild(createCityRow(city));
        })
    })
});

socket.on("forecast", forecast => {
    showForecastsSection();
    forecastTable.appendChild(createForecastRow(forecast));
});

socket.on("subscribe-result", msg => {
    if (msg.result === "success") {
        const button = document.querySelector(`#subscribe-${msg.cityId}`);
        const newButton = button.cloneNode(true);
        if (msg.type === "subscribe") {
            newButton.innerHTML = "Unsubscribe";
            newButton.addEventListener("click", () => unsubscribeToCity(msg.cityId));
        } else {
            newButton.innerHTML = "Subscribe";
            newButton.addEventListener("click", () => subscribeToCity(msg.cityId));
        }
        button.parentNode.replaceChild(newButton, button);
    }
});
