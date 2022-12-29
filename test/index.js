const msg = document.getElementById("msg");
axios.get("./test.json").then((res) => {
  console.log(res.data);
  msg.textContent = JSON.stringify(res.data, null, "\t");
});
