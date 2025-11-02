const API_URL = "https://671891927fc4c5ff8f49fcac.mockapi.io/v2";
const body = document.querySelector('tbody');
let page = 1;
const pageSize = 20;
async function getUsers() {
  try {
    const res = await fetch(`${API_URL}?page=${page}&limit=${pageSize}`);
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
    tags += `<th>${column[column.length - 1]}</th>`;
    for (let i = 1; i < column.length - 1; i++){
        tags += `<th>${column[i]}</th>`;
    };
    tags += `<th>${column[0]}</th>`;
    tags += "</tr>";
    head.innerHTML = tags;
}

function getTDInc(users) {
    let tags = "";
    users.map( (d) => {
        tags += `<tr style="background-color: ${d.color};">
        <td>${d.id}</td>
            
            <td>${d.name}</td>
            <td><img src="${d.avatar}" alt=""></td>
            <td>${d.address}</td>
            <td>${d.genre}</td>
            <td style=" width:1100px;height:50px;">${d.desc}</td>
            <td style="display:flex; width:100%; flex-direction:column; justify-content: center; align-items:center"><div style="background-color:${d.color}; width:50px;height:30px;border-radius:20px;box-shadow: 2px 2px 2px 2px #2e2e2eff; margin-bottom:12px;margin-top:6px"></div>${d.color}</td>
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
            <td>${t = new Date(d.createdAt).toLocaleString()}</td>
            </tr>`
    })

    // body.innerHTML = tags;
    body.insertAdjacentHTML('beforeend', tags);
}
function getTDDes(users) {
    let tags = "";
    users.reverse();
    users.map( (d) => {
        
        tags += `<tr style="background-color: ${d.color};">
        <td>${d.id}</td>
            
            <td>${d.name}</td>
            <td><img src="${d.avatar}" alt=""></td>
            <td>${d.address}</td>
            <td>${d.genre}</td>
            <td style=" width:1100px;height:50px;">${d.desc}</td>
            <td style="display:flex; width:100%; flex-direction:column; justify-content: center; align-items:center"><div style="background-color:${d.color}; width:50px;height:30px;border-radius:20px;box-shadow: 2px 2px 2px 2px #2e2e2eff; margin-bottom:12px;margin-top:6px"></div>${d.color}</td>
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
            <td>${t = new Date(d.createdAt).toLocaleString()}</td>
            </tr>`
    })
    // body.innerHTML = tags;
    body.insertAdjacentHTML('beforeend', tags);
}

async function boot() {
    const users = await getUsers();
    if (page === 1) getTH(users);
    if (page % 2 === 0) getTDDes(users);
    else getTDInc(users);
}
boot();
window.addEventListener("scroll", () => {
  const nearBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 20;
  if (nearBottom) {
    page += 1;
    boot();
  }
});


