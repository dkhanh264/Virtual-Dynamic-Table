
const body = document.querySelector('tbody');
let bufferRows = 10;

async function getUsers() {
  try {
    const res = await fetch('https://671891927fc4c5ff8f49fcac.mockapi.io/v2');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Lỗi gọi API:', err);
  }
}

function getTH(users) {
    const column = Object.keys(users[0]);
    const head = document.querySelector('thead');
    let tags = "<tr>";
    for (i = 0; i < column.length; i++){
        tags += `<th>${column[i]}</th>`;
    };
    tags += "</tr>";
    head.innerHTML = tags;
}

function getTD(users) {
    let tags = "";
    users.map( (d) => {
        tags += `<tr style="color: ${d.color}; display:none">
            <td>${t = new Date(d.createdAt).toLocaleString()}</td>
            <td>${d.name}</td>
            <td><img src="${d.avatar}" alt=""></td>
            <td>${d.address}</td>
            <td>${d.genre}</td>
            <td style=" width:1100px;height:50px;">${d.desc}</td>
            <td><div style="background-color:${d.color}; width:50px;height:30px;border-radius:20px"></div></td>
            <td>${d.email}</td>
            <td>${d.phone}</td>
            <td>${d.timezone}</td>
            <td>${d.building}</td>
            <td>${d.music}</td>
            <td>${d.password}</td>
            <td>${d.city}</td>
            <td>${d.country}</td>
            <td>${d.street}</td>
            <td>${d.state}</td>
            <td>${d.zipcode}</td>
            <td>${d.company}</td>
            <td>${b = new Date(d.dob).toLocaleString()}</td>
            <td>${d.fincode}</td>
            <td>${d.ip}</td>
            <td>${d.job}</td>
            <td>${d.jd}</td>
            <td>${d.typeofjob}</td>
            <td>${d.id}</td>
            </tr>`
    })
    body.innerHTML = tags;
}



function lazyLoadNext(numRows) {
    numRows = Math.min(numRows, body.childNodes.length);

    let rowsLoaded = 0;
    for (let i = 0; i < body.childNodes.length; i++) {
        if (body.childNodes[i].style.display != "none")
            continue;

        body.childNodes[i].style.display = "";

        rowsLoaded++;
        if (rowsLoaded >= numRows)
            break;
    }
}

function lazyLoadBuffer() {
    for (let i = body.childNodes.length - 1; i >= 0; i--) {
        if (body.childNodes[i].style.display == "none")
            continue;

        let rect = body.childNodes[i].getBoundingClientRect();
        let viewHeight = window.innerHeight || document.documentElement.clientHeight;

        if (rect.bottom <= viewHeight * 3) {
            console.log(`Lazy loading ${bufferRows} more rows...`)
            lazyLoadNext(bufferRows);
        }

        break;
    }
}

async function boot() {
    const users = await getUsers();
    getTH(users);
    getTD(users);
    lazyLoadNext(bufferRows);
    window.onscroll = lazyLoadBuffer;
}

boot();
