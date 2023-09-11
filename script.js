function maskPassword(pass) {
  let str = ""
  for (let index =0;index<pass.length;index++) {
    str+='*'
  }
  return str;
}

//Logic to copy
function copyText(txt) {
  navigator.clipboard.writeText(txt).then(
    () => {
      // alert("Copied "+txt);
      document.getElementById("alert").style.display = "inline"
      setTimeout(()=> {
        document.getElementById("alert").style.display = "none"
      }, 2000)
    },
    () => {
      // alert("Clipboard copying failed")
    }
  )

}


//Logic to delete password
const deletePassword = (website) => {
    let data = localStorage.getItem("passwords")
    let arr = JSON.parse(data)
    arrUpdated = arr.filter((e) => {
        return e.website != website
    })
    localStorage.setItem("passwords", JSON.stringify(arrUpdated))
    alert(`Successfully deleted password for ${website}`)
    showPasswords()
}

//Logic to fill the table
const showPasswords = () => {
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    if (data == null || JSON.parse(data).length == 0) {
      tb.innerHTML = "No Passwords saved!!";
    } else {
        tb.innerHTML = ` <tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete</th>
      </tr>`
      let arr = JSON.parse(data);
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        str = `<tr>
        <td>${element.website} <img onclick="copyText('${element.website}')" src="copy.svg" alt="copy" width="18" height="20"/></td>
        <td>${element.username}<img onclick="copyText('${element.username}')" src="copy.svg" alt="copy" width="18" height="20"/> </td>
        <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="copy.svg" alt="copy" width="18" height="20"/></td>
        <td><button class="btnsm" onclick ="deletePassword('${element.website}')">Delete</button></td>
    </tr>
    `;
        tb.innerHTML = tb.innerHTML + str;
      }
    }
    website.value = ""
    username.value = ""
    password.value = ""
}

showPasswords()
document.querySelector(".btn").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Clicked!");
  console.log(username.value, password.value);
  let passwords = localStorage.getItem("passwords");
  if (passwords) {
    let json = JSON.parse(localStorage.getItem("passwords"));
    json.push({website:website.value, username: username.value, password: password.value });
    alert("Password saved!");
    localStorage.setItem("passwords", JSON.stringify(json));
  } else {
   
    let json = [];
    json.push({website:website.value, username: username.value, password: password.value });
    alert("Password saved!");
    localStorage.setItem("passwords", JSON.stringify(json));
  }
  showPasswords()
});
