const msg = document.getElementById("msg");
axios.get("./test.json").then((res) => {
  console.log(res.data);
  const { image, name } = res.data;
  const html = `
  <figure class="inline-flex flex-col items-center">
    <img src="${image}" alt="${name}" />
    <figcaption>${name}</figcaption>
  </figure>
  `;
  msg.insertAdjacentHTML("afterbegin", html);
});
