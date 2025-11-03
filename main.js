const API_URL = "https://671891927fc4c5ff8f49fcac.mockapi.io/v2";

const head = document.querySelector('thead');
const body = document.querySelector('tbody');

let page = 1;
const pageSize = 20;
let sortBy = 'id';
let order  = 'desc';

async function getUsers() {
  try {
    const url = new URL(API_URL);
    url.searchParams.set('page', page);
    url.searchParams.set('limit', pageSize);
    url.searchParams.set('sortBy', sortBy);
    url.searchParams.set('order', order);

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Lỗi gọi API:', err);
    return [];
  }
}

function getTH(users) {
  const columns = Object.keys(users[0]);

  let tags = "<tr>";
  tags += `<th data-key="${columns[columns.length - 1]}">${columns[columns.length - 1]} ${arrow(columns[columns.length - 1])}</th>`;
  for (let i = 1; i < columns.length - 1; i++){
    tags += `<th data-key="${columns[i]}">${columns[i]} ${arrow(columns[i])}</th>`;
  }
  tags += `<th data-key="${columns[0]}">${columns[0]} ${arrow(columns[0])}</th>`;
  tags += "</tr>";

  head.innerHTML = tags;
}

function arrow(col) {
  if (col !== sortBy) return '';
  return order === 'asc' ? '▼' : '▲';
}

function getTD(users) {
  let tags = "";
  users.forEach((d) => {
    tags += `<tr style="background-color: ${d.color};">
      <td>${d.id}</td>
      <td>${d.name}</td>
      <td><img src="${d.avatar}" alt="" style="width:40px;height:40px;object-fit:cover;border-radius:6px"></td>
      <td>${d.address}</td>
      <td>${d.genre}</td>
      <td style="width:1100px;height:50px;overflow:hidden;text-overflow:ellipsis;">${d.desc}</td>
      <td style="display:flex;width:100%;flex-direction:column;justify-content:center;align-items:center">
          <div style="background-color:${d.color};width:50px;height:30px;border-radius:20px;box-shadow:2px 2px 2px 2px #2e2e2e;margin:6px 0 12px"></div>${d.color}
      </td>
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
      <td>${new Date(d.dob).toLocaleString()}</td>
      <td>${d.fincode}</td>
      <td>${d.ip}</td>
      <td>${d.job}</td>
      <td>${d.jd}</td>
      <td>${d.typeofjob}</td>
      <td>${new Date(d.createdAt).toLocaleString()}</td>
    </tr>`;
  });
  body.insertAdjacentHTML('beforeend', tags);
}

async function boot() {
  const users = await getUsers();
  if (!users.length) return;

  if (page === 1) {
    getTH(users);
    body.innerHTML = '';
  }

  getTD(users);
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

head.addEventListener('click', (e) => {
  const th = e.target.closest('th');
  if (!th) return;

  const key = th.getAttribute('data-key');
  if (!key) return;

  if (sortBy === key) {
    order = (order === 'asc') ? 'desc' : 'asc';
  } else {
    sortBy = key;
    order  = 'asc';
  }
  page = 1;
  body.innerHTML = '';
  boot();
});
