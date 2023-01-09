const ambil = document.querySelector(`[data-button="ambil"]`);
const hasil = document.querySelector(`[data-firebase="hasil"]`);
const ofcan1 = document.querySelector(`[data-firebase="offcanvas1"]`);
const reviewcard = document.querySelector(`[data-firebase="reviewcard"]`);

// SELECT ISLAND CITY
const namesearchILND = document.querySelector(`[data-firebase="namesearchILND"]`);
const namesearchCTY = document.querySelector(`[data-firebase="namesearchCTY"]`);
const namesearchDSTNS = document.querySelector(`[data-firebase="namesearchDSTNS"]`);

firebase.database().ref('Destination').limitToFirst(99).orderByKey().once("value", (snap) => { 
  snap.forEach((user) => {
    firebase.database().ref('Destination').limitToFirst(1).orderByKey().once("value", (snap) => { 
      snap.forEach((user1) => {
        if (user.val().island == user1.val().island && user.val().id != user1.val().id) {
        } else {
          namesearchILND.innerHTML += (`
            <option value="${user.val().island}">${user.val().island}</option>
          `);
          namesearchCTY.innerHTML += (`
            <option value="${user.val().city}">${user.val().city}</option>
          `);
          namesearchDSTNS.innerHTML += (`
            <option value="${user.val().namedest}">${user.val().namedest}</option>
          `);
        }
      });
    });
  });
});
// END SELECT ISLAND

// CARD AND OFFCANVAS DESTINATION
firebase.database().ref('Destination').limitToFirst(99).orderByKey().once("value", (snap) => { 
  snap.forEach((user) => {
    ofcan1.innerHTML += (`
    <div class='offcanvas offcanvas-bottom h-100 text-bg-dark' tabindex='-1' id='offcanvasBottom${user.val().id}' aria-labelledby='offcanvasBottomLabel' id='offcanvs'>
        <div class='offcanvas-header'>
          <h1 class='offcanvas-title m-auto judul' id='offcanvasBottomLabel' > 
          ${user.val().namedest} 
          </h1>
          <button type='button' class='btn-close' data-bs-dismiss='offcanvas' aria-label='Close' style='background-color: #A6D6E3;'></button>
        </div>
        <div class='offcanvas-body small'>
          <section>
            <div>
              <div class='container'>
                <h2 class='text-center marg-judul judul1' >DESCRIPTION</h2>
                  <div class='row d-flex justify-content-center'>
                    <div class='col-md-6'>
                      <div id='carouselExampleIndicators' class='carousel slide carousel-fade' data-bs-ride='true'>
                        <div class='carousel-inner'>
                          <div class='carousel-item active'>
                            <img src='${user.val().foto1}' class='d-block w-75' alt='...' />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class='col-md-6 d-flex align-items-center'>
                      <p class='fs-5 text-light' style='text-align: justify;'> ${user.val().desc}
                      </p>
                    </div>
                  </div>
              </div>
            </div>
            <div class='pt-5 pb-5'>
            <div class='container'>
              <h2 class='text-center marg-judul judul1' >Gallery Destination</h2>
              <div class="container">
                <div class="row d-flex flex-wrap align-items-center" data-toggle="modal" data-target="#lightbox">
                  <div class="col-12 col-md-6 col-lg-3">
                    
                <img src="${user.val().foto1}" data-target="#indicators" data-slide-to="0" alt="" /> 
                  </div>
                  <div class="col-12 col-md-6 col-lg-3">
                       <img src="${user.val().foto2}" data-target="#indicators" data-slide-to="1" alt="" />
                  </div>
                  <div class="col-12 col-md-6 col-lg-3">
                     <img src="${user.val().foto3}" data-target="#indicators" data-slide-to="2"  alt="" />
                  </div>
                  <div class="col-12 col-md-6 col-lg-3">
                       <img src="${user.val().foto4}" data-target="#indicators" data-slide-to="3" alt="" />
                  </div>
                  <div class="col-12 col-md-6 col-lg-3">
                       <img src="${user.val().foto5}" data-target="#indicators" data-slide-to="3"  alt="" />
                  </div>
                </div>
                
                <!-- Modal -->
                
              </div>
            </div>
          </div>
          </section>
        </div>
      </div>
    `);

    hasil.innerHTML += (`
        <div class="col">
          <div class="card mb-2 cardH rounded-5">
            <h3 class="juduldest fs-3">${user.val().namedest}</h3>
            <img class="rounded-2" src="${user.val().image}" alt="" srcset="">
              <button class="learn-more wrapbottom" data-bs-toggle='offcanvas' data-bs-target='#offcanvasBottom${user.val().id}' aria-controls='offcanvasBottom'>
                <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
                </span>
                <span class="button-text">Read More</span>
              </button>
          </div>
        </div>
    `);
  });
});
// END CARD AND OFFCANVAS DESTINATION

// SEARCH BY TEXT INPUT
function SearchByText() {
  const checkBox = document.getElementById('InputSearchText').value;
  firebase.database().ref('Destination').limitToFirst(99).orderByKey().once("value", (snap) => { 
    hasil.innerHTML = '';
    snap.forEach((user) => {
      if (checkBox == user.val().island || checkBox == user.val().island || checkBox == user.val().island) {
        hasil.innerHTML += (`
        <div class="col">
          <div class="card mb-2 cardH rounded-5">
            <h3 class="juduldest fs-3">${user.val().namedest}</h3>
            <img class="rounded-2" src="${user.val().image}" alt="" srcset="">
              <button class="learn-more wrapbottom" data-bs-toggle='offcanvas' data-bs-target='#offcanvasBottom${user.val().id}' aria-controls='offcanvasBottom'>
                <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
                </span>
                <span class="button-text">Read More</span>
              </button>
          </div>
        </div>
        `);
      } else if (checkBox == "" || checkBox == "") {
        hasil.innerHTML += (`
        <div class="col">
          <div class="card mb-2 cardH rounded-5">
            <h3 class="juduldest fs-3">${user.val().namedest}</h3>
            <img class="rounded-2" src="${user.val().image}" alt="" srcset="">
              <button class="learn-more wrapbottom" data-bs-toggle='offcanvas' data-bs-target='#offcanvasBottom${user.val().id}' aria-controls='offcanvasBottom'>
                <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
                </span>
                <span class="button-text">Read More</span>
              </button>
          </div>
        </div>
        `);
      }
    });
  });
}
// SEARCH BY TEXT INPUT

// SEARCH ISLAND
function getCheckedSRCH() {
  const checkBox = document.getElementById('namesearchILND').value;
  firebase.database().ref('Destination').limitToFirst(99).orderByKey().on("value", (snap) => { 
    hasil.innerHTML = '';
    snap.forEach((user) => {
      if (checkBox == user.val().island) {
        hasil.innerHTML += (`
        <div class="col">
          <div class="card mb-2 cardH rounded-5">
            <h3 class="juduldest fs-3">${user.val().namedest}</h3>
            <img class="rounded-2" src="${user.val().image}" alt="" srcset="">
              <button class="learn-more wrapbottom" data-bs-toggle='offcanvas' data-bs-target='#offcanvasBottom${user.val().id}' aria-controls='offcanvasBottom'>
                <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
                </span>
                <span class="button-text">Read More</span>
              </button>
          </div>
        </div>
        `);
      } else if (checkBox == "showall" || checkBox == "defaultILND") {
        hasil.innerHTML += (`
        <div class="col">
          <div class="card mb-2 cardH rounded-5">
            <h3 class="juduldest fs-3">${user.val().namedest}</h3>
            <img class="rounded-2" src="${user.val().image}" alt="" srcset="">
              <button class="learn-more wrapbottom" data-bs-toggle='offcanvas' data-bs-target='#offcanvasBottom${user.val().id}' aria-controls='offcanvasBottom'>
                <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
                </span>
                <span class="button-text">Read More</span>
              </button>
          </div>
        </div>
        `);
      }
    });
  });
}
// END SEARCH ISLAND

// SEARCH CITY
function getCheckedCTY() {
  const checkBox = document.getElementById('namesearchCTY').value;
  firebase.database().ref('Destination').limitToFirst(99).orderByKey().on("value", (snap) => { 
    hasil.innerHTML = '';
    snap.forEach((user) => {
      if (checkBox == user.val().city) {
        hasil.innerHTML += (`
        <div class="col">
          <div class="card mb-2 cardH rounded-5">
            <h3 class="juduldest fs-3">${user.val().namedest}</h3>
            <img class="rounded-2" src="${user.val().image}" alt="" srcset="">
              <button class="learn-more wrapbottom" data-bs-toggle='offcanvas' data-bs-target='#offcanvasBottom${user.val().id}' aria-controls='offcanvasBottom'>
                <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
                </span>
                <span class="button-text">Read More</span>
              </button>
          </div>
        </div>
        `);
      } else if (checkBox == "showall" || checkBox == "defaultCTY") {
        hasil.innerHTML += (`
        <div class="col">
          <div class="card mb-2 cardH rounded-5">
            <h3 class="juduldest fs-3">${user.val().namedest}</h3>
            <img class="rounded-2" src="${user.val().image}" alt="" srcset="">
              <button class="learn-more wrapbottom" data-bs-toggle='offcanvas' data-bs-target='#offcanvasBottom${user.val().id}' aria-controls='offcanvasBottom'>
                <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
                </span>
                <span class="button-text">Read More</span>
              </button>
          </div>
        </div>
        `);
      }
    });
  });
}
// END SEARCH CITY

// SEARCH DESTINATION
function getCheckedDSTNS() {
  const checkBox = document.getElementById('namesearchDSTNS').value;
  firebase.database().ref('Destination').limitToFirst(99).orderByKey().on("value", (snap) => { 
    hasil.innerHTML = '';
    snap.forEach((user) => {
      if (checkBox == user.val().namedest) {
        hasil.innerHTML += (`
        <div class="col">
          <div class="card mb-2 cardH rounded-5">
            <h3 class="juduldest fs-3">${user.val().namedest}</h3>
            <img class="rounded-2" src="${user.val().image}" alt="" srcset="">
              <button class="learn-more wrapbottom" data-bs-toggle='offcanvas' data-bs-target='#offcanvasBottom${user.val().id}' aria-controls='offcanvasBottom'>
                <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
                </span>
                <span class="button-text">Read More</span>
              </button>
          </div>
        </div>
        `);
      } else if (checkBox == "showall" || checkBox == "defaultDSTNS") {
        hasil.innerHTML += (`
        <div class="col">
          <div class="card mb-2 cardH rounded-5">
            <h3 class="juduldest fs-3">${user.val().namedest}</h3>
            <img class="rounded-2" src="${user.val().image}" alt="" srcset="">
              <button class="learn-more wrapbottom" data-bs-toggle='offcanvas' data-bs-target='#offcanvasBottom${user.val().id}' aria-controls='offcanvasBottom'>
                <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
                </span>
                <span class="button-text">Read More</span>
              </button>
          </div>
        </div>
        `);
      }
    });
  });
}
// END SEARCH DESTINATION

// SHOW IN CONSOLE LOG WHEN BUTTON OPTION UPDATE DESTINATION CLICKED
function getChecked() {
  const checkBox = document.getElementById('namedestUP1').value;
  console.log(checkBox);
}
// END SHOW IN CONSOLE LOG WHEN BUTTON OPTION UPDATE DESTINATION CLICKED

// SHOW IN CONSOLE LOG WHEN BUTTON OPTION DELETE DESTINATION CLICKED
function getCheckedDLT() {
  const checkBoxDLT = document.getElementById('namedestDLT').value;
  console.log(checkBoxDLT);
}
// SHOW IN CONSOLE LOG WHEN BUTTON OPTION DELETE DESTINATION CLICKED

function getCheckedRVW() {
  const checkBoxRVW = document.getElementById('namedestRVW').value;
  console.log(checkBoxRVW);
}

// LOOP OPTION
const OPnamedestUP1 = document.querySelector(`[data-firebase="OPnamedestUP1"]`);
const namedestDLT = document.querySelector(`[data-firebase="namedestDLT"]`);
const namedestRVW = document.querySelector(`[data-firebase="namedestRVW"]`);

firebase.database().ref('Destination').limitToFirst(99).orderByKey().once("value", (snap) => { 
  snap.forEach((user) => {
    // UPDATE Name Destination
    OPnamedestUP1.innerHTML += (`
      <option value="${user.val().namedest}">${user.val().namedest}</option>
    `);
    // END UPDATE Name Destination

    // DELETE Name Destination
    namedestDLT.innerHTML += (`
      <option value="${user.val().namedest}">${user.val().namedest}</option>
    `);
    // END DELETE Name Destination

    // Review Destination
    namedestRVW.innerHTML += (`
      <option value="${user.val().namedest}">${user.val().namedest}</option>
    `);
    // END Review Destination
  });
});
// END LOOP OPTION

// DELETE DATA
const kirimDLT = document.querySelector(`[data-button="kirimDLT"]`);
kirimDLT.onclick = () => {
  firebase.database().ref('Destination/' + namedestDLT.value).remove();
  const toastTrigger1 = document.getElementById("liveToastBtn1");
  const toastLiveExample1 = document.getElementById("liveToast1");
  if (toastTrigger1) {
    toastTrigger1.addEventListener("click", () => {
      const toast = new bootstrap.Toast(toastLiveExample1);
      toast.show();
    });
  }
}
// END DELETE DATA

// REVIEW CARD
firebase.database().ref('Reviews/').limitToFirst(99).orderByKey().once("value", (snap) => {
  snap.forEach((user) => {
    reviewcard.innerHTML += (`
      <div class="col mb-5">
      <div class="card" style="background-color: #12192c;">
        <div class="card-body">
          <h3 class="card-title">${user.val().Name} </h3>
          <h5 class="card-subtitle mb-2 text-secondary-emphasis">${user.val().Profesi}</h5>
          <h6 class="card-subtitle mb-2 text-secondary-emphasis">About ${user.val().namedest}</h6>
          <p class="card-text">${user.val().Review}</p>
          <h6 class="card-subtitle mb-2 text-secondary-emphasis">This Review Was made on ${user.val().TanggalDibuat}</h6>
        </div>
      </div>
    </div>
      `);
  });
});
// END REVIEW CARD

// ADD DATA
const namedest = document.querySelector(`[data-input="namedest"]`);
const desc = document.querySelector(`[data-input="desc"]`);
const city = document.querySelector(`[data-input="city"]`);
const island = document.querySelector(`[data-input="island"]`);
const image = document.querySelector(`[data-input="image"]`);
const id = document.querySelector(`[data-input="id"]`);
const foto1 = document.querySelector(`[data-input="foto1"]`);
const foto2 = document.querySelector(`[data-input="foto2"]`);
const foto3 = document.querySelector(`[data-input="foto3"]`);
const foto4 = document.querySelector(`[data-input="foto4"]`);
const foto5 = document.querySelector(`[data-input="foto5"]`);
const kirim = document.querySelector(`[data-button="kirim"]`);

firebase.database().ref('Destination').limitToFirst(99).orderByKey().once("value", (snap) => {
  kirim.onclick = () => {
    const data = {
      namedest: namedest.value,
      desc: desc.value,
      city: city.value,
      island: island.value,
      image: image.value,
      id: snap.numChildren()+1,
      foto1: foto1.value,
      foto2: foto2.value,
      foto3: foto3.value,
      foto4: foto4.value,
      foto5: foto5.value,
    }
    
    if (namedest.value == "") {
      alert("Fill In The Name Input Field!!!");
    } else if (desc.value == "") {
      alert("Fill In The Description Input Field!!!");
    } else if (city.value == "") {
      alert("Fill In The City Input Field!!!");
    } else if (island.value == "") {
      alert("Fill In The Island Input Field!!!");
    } else if (image.value == "") {
      alert("Fill In The URL Image Input Field!!!");
    } else if (foto1.value == "") {
      alert("Fill In The Image 1 Input Field!!!");
    } else if (foto2.value == "") {
      alert("Fill In The Image 2 Input Field!!!");
    } else if (foto3.value == "") {
      alert("Fill In The Image 3 Input Field!!!");
    } else if (foto4.value == "") {
      alert("Fill In The Image 4 Input Field!!!");
    } else if (foto5.value == "") {
      alert("Fill In The Image 5 Input Field!!!");
    } else {
      firebase.database().ref('Destination/' + namedest.value).set(data);
      // POP UP MESSAGE
      const toastTrigger = document.getElementById("liveToastBtn");
      const toastLiveExample = document.getElementById("liveToast");
      if (toastTrigger) {
        toastTrigger.addEventListener("click", () => {
          const toast = new bootstrap.Toast(toastLiveExample);
          toast.show();
        });
      }
      // END POP UP MESSAGE
    }
  }
});
// END ADD DATA

// UPDATE DATA
const namedestUP = document.querySelector(`[data-input="namedestUP"]`);
const namedestUP1 = document.querySelector(`[data-input="namedestUP1"]`);
const descUP = document.querySelector(`[data-input="descUP"]`);
const cityUP = document.querySelector(`[data-input="cityUP"]`);
const islandUP = document.querySelector(`[data-input="islandUP"]`);
const imageUP = document.querySelector(`[data-input="imageUP"]`);
const foto1UP = document.querySelector(`[data-input="foto1UP"]`);
const foto2UP = document.querySelector(`[data-input="foto2UP"]`);
const foto3UP = document.querySelector(`[data-input="foto3UP"]`);
const foto4UP = document.querySelector(`[data-input="foto4UP"]`);
const foto5UP = document.querySelector(`[data-input="foto5UP"]`);
const kirimUP = document.querySelector(`[data-button="kirimUP"]`);

kirimUP.onclick = () => {
  const data = {
    desc: descUP.value,
    city: cityUP.value,
    island: islandUP.value,
    image: imageUP.value,
    foto1: foto1UP.value,
    foto2: foto2UP.value,
    foto3: foto3UP.value,
    foto4: foto4UP.value,
    foto5: foto5UP.value,
  }
  
  if (descUP.value == "") {
    delete data.desc;
  } 
  if (cityUP.value == "") {
    delete data.city;
  } 
  if (islandUP.value == "") {
    delete data.island;
  } 
  if (imageUP.value == "") {
    delete data.image;
  } 
  if (foto1UP.value == "") {
    delete data.foto1;
  } 
  if (foto2UP.value == "") {
    delete data.foto2;
  } 
  if (foto3UP.value == "") {
    delete data.foto3;
  } 
  if (foto4UP.value == "") {
    delete data.foto4;
  } 
  if (foto5UP.value == "") {
    delete data.foto5;
  } 
  if (namedestUP1.value == "default") {
    alert("Select a Destination Name!!!");
  } else {
    firebase.database().ref('Destination/' + namedestUP1.value).update(data);
    
    const toastTrigger1 = document.getElementById("liveToastBtn1");
    const toastLiveExample1 = document.getElementById("liveToast1");
    if (toastTrigger1) {
      toastTrigger1.addEventListener("click", () => {
        const toast = new bootstrap.Toast(toastLiveExample1);
        toast.show();
      });
    }
  }
}
// END UPDATE DATA

// REVIEW CARD
const namereviewer = document.querySelector(`[data-input="namereviewer"]`);
const profreviewer = document.querySelector(`[data-input="profreviewer"]`);
// const namedestRVW = document.querySelector(`[data-input="namedestRVW"]`);
const descreviewer = document.querySelector(`[data-input="descreviewer"]`);
const kirimRVW = document.querySelector(`[data-button="kirimRVW"]`);

// FUNCTION GET MONTH
function toMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', {
    month: 'long',
  });
}
// END FUNCTION GET MONTH

firebase.database().ref('Reviews/').limitToFirst(99).orderByKey().once("value", (snap) => {
  kirimRVW.onclick = () => {
    const data = {
      Name: namereviewer.value,
      Profesi: profreviewer.value,
      Review: descreviewer.value,
      id: snap.numChildren()+1,
      TanggalDibuat: toMonthName(new Date().getMonth() + 1) + " " + new Date().getDate().toString() + ', '+ new Date().getFullYear().toString(), 
      namedest: namedestRVW.value,
    }
    if (namedestRVW.value == "defaultRVW") {
      alert("Select a Destination For Review")
    } else if ((namereviewer.value == "")) {
      alert("Fill in The Name Input Field")
    } else if ((profreviewer.value == "")) {
      alert("Fill in The Profession Input Field")
    } else if ((descreviewer.value == "")) {
      alert("Fill in The Review Input Field")
    }else {
      firebase.database().ref('Reviews/' + namedestRVW.value + '-' + toMonthName(new Date().getMonth() + 1)+ new Date().getDate().toString() + ','+ new Date().getFullYear().toString() + ',' + new Date().getHours().toString()+":"+new Date().getMinutes().toString()+"-"+new Date().getSeconds().toString()+'"').set(data);
    }
    // POP UP MESSAGE
      const toastTrigger = document.getElementById("liveToastBtn");
      const toastLiveExample = document.getElementById("liveToast");
      if (toastTrigger) {
        toastTrigger.addEventListener("click", () => {
          const toast = new bootstrap.Toast(toastLiveExample);
          toast.show();
        });
      }
      // END POP UP MESSAGE
  }
});
// END REVIEW CARD

function checklogin() {
  const username = document.getElementById("InputUsername").value;
  const password = document.getElementById("InputPassword").value;
  if (username == "admin" && password == "123") {
    console.log(username, password)
    document.getElementById("wadahbuttonadm").innerHTML = "<button type='button' class='btn btn-success' data-bs-toggle='offcanvas' data-bs-target='#offcanvasRight' aria-controls='offcanvasRight'>Login</button>"
  } else {
    alert("You Entered The Wrong User or Password")
  }
}