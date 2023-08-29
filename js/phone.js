const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhone(phones, isShowAll);
};

const displayPhone = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  // to clear phone before search
  phoneContainer.textContent = "";
  // display show all button if there are more than 12 phone
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  //   console.log("is how all", isShowAll);
  // display first 12 phones if not show all
  // phones = phones.slice(0,12);
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    // console.log(phone)
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-100 shadow-xl p-4`;
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
      
      <button onclick="handleShowDetails('${phone.slug}'); " class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;
    phoneContainer.appendChild(phoneCard);
  });

  // hide loading spinner
  toggleloadingspinner(false);
};
// handle search

const handleSearch = (isShowAll) => {
  toggleloadingspinner(true);
  const searchField = document.getElementById("input-search");
  const searchText = searchField.value;
  //   console.log(searchText);
  loadPhone(searchText, isShowAll);
};

const toggleloadingspinner = (isLoading) => {
  const loadingspinner = document.getElementById("loading-spinner");
  // loadingspinner.classList.remove('hidden');
  if (isLoading) {
    loadingspinner.classList.remove("hidden");
  } else {
    loadingspinner.classList.add("hidden");
  }
};

// handle Show all
const handleShowAll = () => {
  handleSearch(true);
};

// handle Show Details

const handleShowDetails = async (id) => {
  //   console.log(id);
  // load single phone data

  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  //   console.log(phone)
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById("show-detail-phone-name");
  phoneName.innerText = phone.name;
  const showDetailsContainer = document.getElementById("show-detail-detail");
  showDetailsContainer.innerHTML = `
        <img class="m-auto pb-4" src="${phone.image}" alt="" />
        <p><span class="font-bold">Storages :</span>${phone.mainFeatures?.storage}</p>
        <p><span class="font-bold">DisplaySize : </span>${phone.mainFeatures?.displaySize}</p>
        <p><span class="font-bold">chipSet : </span>${phone.mainFeatures?.chipSet}</p>
        <p><span class="font-bold">memory : </span>${phone.mainFeatures?.memory}</p>
        <p><span class="font-bold">releaseDate : </span>${phone.releaseDate}</p>
        <p><span class="font-bold">brand : </span>${phone.brand}</p>
        <p><span class="font-bold">slug : </span>${phone.slug}</p>
        <p><span class="font-bold">GPS : </span>${phone.others?.GPS || 'No GPS available in this devices'}</p>

        `;

  // show the model
  show_details_modal.showModal();
};
