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

// buat element icon

const tampilkanData = () => {
  list.forEach(element => {
    const i = document.createElement("i");
    const p = document.createElement("span");
    let li = document.createElement("li");
    p.appendChild(document.createTextNode(element.nama));
    li.appendChild(p);
    ul.appendChild(li);
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
  let data = { nama: namaList };
  dataList.push(data);
  let addList = JSON.stringify(dataList);
  localStorage.setItem("dataList", addList);
};
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
});
input.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    add(input.value);
    ul.innerHTML = "";
    tampilkanData();
    input.value = "";
  }
});

ul.addEventListener("click", function (e) {
  if (e.target.tagName == "I") {
    hapus(e.target.parentElement.innerText);

    location.reload();
  }
});
