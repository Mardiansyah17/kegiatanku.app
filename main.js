const ul = document.querySelector("ul");
const containerList = document.querySelector(".list");
if (localStorage.length == 0) {
  localStorage.setItem("dataList", "[]");
}

// jika di layar hp hapus shadow dan atur lebar
if (window.screen.width < 400) {
  ul.classList.remove("shadow-lg", "p-3", "mb-5", "rounded");
}
const inputContainer = document.querySelector("#input_container");
if (window.screen.width < 400) {
  inputContainer.classList.replace("col-md-5", "col-10");
}
const loadData = () => {
  let fileLocalStorage = localStorage.getItem("dataList");
  let dataList = JSON.parse(fileLocalStorage);

  return dataList;
};
let list = loadData();

// tampilkan tombol hapus semua jika ada isi
const btnDeleteAll = document.querySelector("#deleteAll");
const h4 = document.querySelector(".h4");
if (list.length > 0) {
  btnDeleteAll.style.display = "";
  h4.style.display = "none";
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
Input.value = "";
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
