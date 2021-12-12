const ul = document.querySelector("ul");
const containerList = document.querySelector(".list");
if (localStorage.length == 0) {
  localStorage.setItem("dataList", "[]");
}
const loadData = () => {
  let fileLocalStorage = localStorage.getItem("dataList");
  let dataList = JSON.parse(fileLocalStorage);

  return dataList;
};
let list = loadData();

// tampilkan tombol hapus semua jika ada isi
const btnDeleteAll = document.querySelector("#deleteAll");

if (list.length > 0) {
  btnDeleteAll.style.display = "";
}
if (list.length == 0) {
}

const tampilkanData = () => {
  list.forEach(element => {
    const i = document.createElement("i");
    const span = document.createElement("span");
    let li = document.createElement("li");
    span.appendChild(document.createTextNode(element.nama));
    li.appendChild(span);
    ul.appendChild(li);
    if (element.selesai == true) {
      span.style.textDecoration = "line-through";
    }
    li.classList.add("list-group-item");
    li.appendChild(i);
    i.classList.add("far");
    i.classList.add("fa-trash-alt");
    li.classList.add("d-flex");
    li.classList.add("justify-content-between");
  });
};
tampilkanData();
const input = document.querySelector("input[type=text]");
// tambah data
const add = namaList => {
  let dataList = list;
  let data = {
    nama: namaList,
    selesai: false,
  };
  dataList.push(data);
  let addList = JSON.stringify(dataList);
  localStorage.setItem("dataList", addList);
};

// hapus function
const hapus = nama => {
  let newlist = list.filter(e => e.nama !== nama);
  let data = JSON.stringify(newlist);
  localStorage.setItem("dataList", data);
};

const btn = document.querySelector("button");
btn.addEventListener("click", function () {
  add(input.value);
  ul.innerHTML = "";
  tampilkanData();
  if (list.length > 0) {
    btnDeleteAll.style.display = "";
  }
});
input.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    add(input.value);
    ul.innerHTML = "";
    tampilkanData();
    input.value = "";
    if (list.length > 0) {
      btnDeleteAll.style.display = "";
    }
  }
});

// jika tombol hapus di klik hapus list tersebut
ul.addEventListener("click", function (e) {
  if (e.target.tagName == "I") {
    hapus(e.target.parentElement.innerText);

    location.reload();
  }
});

// Hapus Semua
btnDeleteAll.addEventListener("click", function () {
  localStorage.setItem("dataList", "[]");
  location.reload();
});

// jika list di klik coret
ul.addEventListener("click", function (e) {
  if (e.target.tagName == "LI") {
    let tes = list.find(data => data.nama == e.target.children[0].innerText);
    tes.selesai = true;
    let newData = JSON.stringify(list);
    localStorage.setItem("dataList", newData);
    location.reload();
  }
});
