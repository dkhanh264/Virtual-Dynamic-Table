const API_URL = "https://671891927fc4c5ff8f49fcac.mockapi.io/v2";

const head = document.querySelector("thead");
const body = document.querySelector("tbody");
const container = document.querySelector(".main-container");
const gapLoad = 100;
const createBtn = document.querySelector(".create-edit-btn");
const btnAdd = document.getElementById("btnAdd");
const hdModal = document.querySelector(".header-modal");
let page = 1;
const pageSize = 20;
let sortBy = "id";
let order = "desc";
let isLoading = false;
let hasMore = true;
async function getUsers() {
  try {
    const url = new URL(API_URL);
    url.searchParams.set("page", page);
    url.searchParams.set("limit", pageSize);
    url.searchParams.set("sortBy", sortBy);
    url.searchParams.set("order", order);

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Lỗi gọi API:", err);
    return [];
  }
}

function getTH(users) {
  let tags = "<tr>";

  tags += `<th>Actions</th>`;
  tags += `<th data-key="id">id ${arrow("id")}</th>`;
  tags += `<th data-key="avatar">avatar ${arrow("avatar")}</th>`;
  tags += `<th data-key="name">name ${arrow("name")}</th>`;
  tags += `<th style="text-align:center" data-key="color">color ${arrow(
    "color"
  )}</th>`;
  tags += `<th data-key="address">address ${arrow("address")}</th>`;
  tags += `<th data-key="genre">genre ${arrow("genre")}</th>`;
  tags += `<th data-key="desc">desc ${arrow("desc")}</th>`;

  tags += `<th data-key="email">email ${arrow("email")}</th>`;
  tags += `<th data-key="phone">phone ${arrow("phone")}</th>`;
  tags += `<th data-key="timezone">timezone ${arrow("timezone")}</th>`;
  tags += `<th data-key="building">building ${arrow("building")}</th>`;
  tags += `<th data-key="music">music ${arrow("music")}</th>`;
  tags += `<th data-key="password">password ${arrow("password")}</th>`;
  tags += `<th data-key="city">city ${arrow("city")}</th>`;
  tags += `<th data-key="country">country ${arrow("country")}</th>`;
  tags += `<th data-key="street">street ${arrow("street")}</th>`;
  tags += `<th data-key="state">state ${arrow("state")}</th>`;
  tags += `<th data-key="zipcode">zipcode ${arrow("zipcode")}</th>`;
  tags += `<th data-key="company">company ${arrow("company")}</th>`;
  tags += `<th data-key="dob">dob ${arrow("dob")}</th>`;
  tags += `<th data-key="fincode">fincode ${arrow("fincode")}</th>`; // Lưu ý: tránh nhầm "finecode"
  tags += `<th data-key="ip">ip ${arrow("ip")}</th>`;
  tags += `<th data-key="job">job ${arrow("job")}</th>`;
  tags += `<th data-key="jd">jd ${arrow("jd")}</th>`;
  tags += `<th data-key="typeofjob">typeofjob ${arrow("typeofjob")}</th>`;
  tags += `<th data-key="createdAt">createdAt ${arrow("createdAt")}</th>`;

  tags += "</tr>";
  head.innerHTML = tags;
}

function arrow(col) {
  if (col !== sortBy) return "";
  return order === "asc" ? "▼" : "▲";
}
function isValidEmail(v) {
  if (!v) return true; // empty allowed, other checks handle requiredness
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function isValidPhone(v) {
  if (!v) return true;
  return /^0\d{9}$/.test(v);
}

function isValidURL(v) {
  if (!v) return true;
  return /^(https?:\/\/).+/i.test(v);
}

function getTD(users) {
  let tags = "";
  users.forEach((d) => {
    tags += renderRow(d);
  });
  body.insertAdjacentHTML("beforeend", tags);
}

// Render a single row's HTML (kept consistent with getTD layout)
function renderRow(d) {
  return `<tr id="row-${d.id}" style="background-color: ${d.color}10; color: ${
    d.color
  };">
    <td>
        <button class="edit-btn" onclick="editRecord(${
          d.id
        })" style="padding:10px 12px;background:#63ACDC;color:white;border:none;border-radius:10px;cursor:pointer;font-size:12px; margin-right: 8px;"><i class="fa-solid fa-pen"></i></button>
        <button class="delete-btn" onclick="deleteRecord(${
          d.id
        })" style="padding:10px 12px;background:#DF8B8B;color:white;border:none;border-radius:10px;cursor:pointer;font-size:12px;"><i class="fa-solid fa-trash"></i></button>
      </td>
      <td>${d.id}</td>
      <td><img src="${d.avatar}" alt="" ></td>
      <td>${d.name}</td>
      <td style="display:flex;width:100%;flex-direction:column;justify-content:center;align-items:center">
          <div style="background-color:${
            d.color
          };width:50px;height:30px;border-radius:20px;box-shadow: 2px 2px 2px 2px #dadadaff;margin:6px 0 12px"></div>${
    d.color
  }
      </td>
      <td>${d.address}</td>
      <td>${d.genre}</td>
      <td style="width:1100px;height:50px;overflow:hidden;text-overflow:ellipsis;">${
        d.desc
      }</td>
      
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
}

async function boot() {
  if (!hasMore) return;
  const users = await getUsers();
  if (!users.length) return;

  if (page === 1) {
    getTH(users);
    body.innerHTML = "";
  }

  if (!users.length) {
    hasMore = false;
    return;
  }

  getTD(users);

  if (users.length < pageSize) hasMore = false;
}

boot();

container.addEventListener("scroll", async () => {
  if (isLoading) return;

  const nearBottom =
    container.scrollTop + container.clientHeight >=
    container.scrollHeight - gapLoad;

  if (nearBottom) {
    isLoading = true;
    page += 1;
    await boot();
    isLoading = false;
  }
});

btnAdd.addEventListener("click", () => {
  showModal();
  createBtn.innerText = "Tạo";
  hdModal.innerText = "Tạo Record Mới";
});

head.addEventListener("click", (e) => {
  const th = e.target.closest("th");
  if (!th) return;

  const key = th.getAttribute("data-key");
  if (!key) return;

  if (sortBy === key) {
    order = order === "asc" ? "desc" : "asc";
  } else {
    sortBy = key;
    order = "asc";
  }
  page = 1;
  body.innerHTML = "";
  boot();
});

function showModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("formAdd").reset();
}

document.getElementById("formAdd").addEventListener("submit", async (e) => {
  e.preventDefault();
  // Basic client-side validation using regex helpers
  const fm = new FormData(e.target);
  const emailVal = (fm.get("email") || "").trim();
  const phoneVal = (fm.get("phone") || "").trim();
  const avatarVal = (fm.get("avatar") || "").trim();

  if (!isValidEmail(emailVal)) {
    alert("Email không hợp lệ");
    return;
  }
  if (!isValidPhone(phoneVal)) {
    alert("Số điện thoại không hợp lệ");
    return;
  }
  if (!isValidURL(avatarVal)) {
    alert("URL avatar không hợp lệ (ví dụ: https://...)");
    return;
  }
  if (createBtn.innerText === "Cập nhật") {
    const editId = document.getElementById("editId").value;

    if (editId) {
      e.preventDefault();
      const formData = new FormData(e.target);

      const payload = {
        name: formData.get("name") || "N/A",
        email: formData.get("email") || "N/A",
        phone: formData.get("phone") || "N/A",
        address: formData.get("address") || "N/A",
        company: formData.get("company") || "N/A",
        job: formData.get("job") || "N/A",
        city: formData.get("city") || "N/A",
        country: formData.get("country") || "N/A",
        street: formData.get("street") || "N/A",
        state: formData.get("state") || "N/A",
        zipcode: formData.get("zipcode") || "00000",
        genre: formData.get("genre") || "N/A",
        building: formData.get("building") || "N/A",
        music: formData.get("music") || "N/A",
        timezone: formData.get("timezone") || "UTC",
        avatar: formData.get("avatar") || "https://via.placeholder.com/40",
        color: formData.get("color") || "#cccccc",
        desc: formData.get("desc") || "N/A",
        password: formData.get("password") || "N/A",
        fincode: formData.get("fincode") || "000000",
        ip: formData.get("ip") || "1.1.1.1",
        jd: formData.get("jd") || "N/A",
        typeofjob: formData.get("typeofjob") || "General",
        dob: formData.get("dob") || "N/A",
        createdAt: new Date().toISOString(),
      };

      try {
        const res = await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const updated = await res.json();
          const row = document.getElementById(`row-${updated.id}`);
          if (row) row.outerHTML = renderRow(updated);
          alert("Cập nhật thành công!");
          closeModal();
          document.getElementById("formAdd").reset();
          document.getElementById("editId").value = "";
        } else {
          alert("Lỗi cập nhật!");
        }
      } catch (err) {
        alert("Lỗi: " + err.message);
      }
    }
  } else {
    const formData = new FormData(e.target);
    const now = new Date().toISOString();

    const payload = {
      name: formData.get("name") || "N/A",
      email: formData.get("email") || "N/A",
      phone: formData.get("phone") || "N/A",
      address: formData.get("address") || "N/A",
      company: formData.get("company") || "N/A",
      job: formData.get("job") || "N/A",
      city: formData.get("city") || "N/A",
      country: formData.get("country") || "N/A",
      street: formData.get("street") || "N/A",
      state: formData.get("state") || "N/A",
      zipcode: formData.get("zipcode") || "00000",
      finecode: formData.get("finecode") || "00000",
      genre: formData.get("genre") || "N/A",
      building: formData.get("building") || "N/A",
      music: formData.get("music") || "N/A",
      timezone: formData.get("timezone") || "UTC",
      avatar: formData.get("avatar") || "https://via.placeholder.com/40",
      color: formData.get("color") || "#cccccc",
      desc: formData.get("desc") || "N/A",
      password: formData.get("password") || "N/A",
      fincode: "000000",
      ip: formData.get("ip") || "1.1.1.1",
      jd: formData.get("jd") || "N/A",
      typeofjob: formData.get("typeofjob") || "General",
      dob: formData.get("dob") || "N/A",
      createdAt: now,
    };

    try {
      const res = await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const created = await res.json();
        body.insertAdjacentHTML("afterbegin", renderRow(created));
        closeModal();
      }
    } catch (err) {
      console.error("Error:", err);
    }
  }
});

// Edit Record
async function editRecord(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const d = await res.json();

    document.getElementById("editId").value = id;
    document.querySelector('input[name="name"]').value = d.name || "";
    document.querySelector('input[name="email"]').value = d.email || "";
    document.querySelector('input[name="phone"]').value = d.phone || "";
    document.querySelector('input[name="address"]').value = d.address || "";
    document.querySelector('input[name="company"]').value = d.company || "";
    document.querySelector('input[name="job"]').value = d.job || "";
    document.querySelector('input[name="city"]').value = d.city || "";
    document.querySelector('input[name="country"]').value = d.country || "";
    document.querySelector('input[name="street"]').value = d.street || "";
    document.querySelector('input[name="state"]').value = d.state || "";
    document.querySelector('input[name="zipcode"]').value =
      d.zipcode || "00000";
    document.querySelector('input[name="genre"]').value = d.genre || "male";
    document.querySelector('input[name="building"]').value = d.building || "";
    document.querySelector('input[name="music"]').value = d.music || "";
    document.querySelector('input[name="timezone"]').value = d.timezone || "";
    document.querySelector('input[name="password"]').value = d.password || "";
    document.querySelector('input[name="ip"]').value = d.ip || "";
    document.querySelector('input[name="jd"]').value = d.jd || "";
    document.querySelector('input[name="typeofjob"]').value = d.typeofjob || "";
    document.querySelector('input[name="fincode"]').value =
      d.fincode || "000000";
    document.querySelector('input[name="avatar"]').value = d.avatar || "";
    document.querySelector('input[name="dob"]').value = d.dob || "";
    document.querySelector('input[name="color"]').value =
      d.color || "#ffffffff";
    document.querySelector('textarea[name="desc"]').value = d.desc || "";

    showModal();
    createBtn.innerText = "Cập nhật";
    hdModal.innerText = "Cập nhật Record";
  } catch (err) {
    alert("Lỗi tải dữ liệu: " + err.message);
  }
}

// Delete Record
async function deleteRecord(id) {
  if (!confirm("Bạn chắc chắn muốn xóa?")) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      // remove the row from DOM without reloading
      const row = document.getElementById(`row-${id}`);
      if (row) row.remove();
      alert("Xóa thành công!");
    } else {
      alert("Lỗi xóa!");
    }
  } catch (err) {
    alert("Lỗi: " + err.message);
  }
}
