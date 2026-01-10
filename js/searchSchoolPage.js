const schools = [
  {
    name: "Al Amal School",
    rating: 4,
    image: "https://i.pinimg.com/1200x/da/0b/8a/da0b8a73587be2b85df3a6d62ad22f67.jpg"
  },
  {
    name: "Future Leaders Academy",
    rating: 5,
    image: "https://i.pinimg.com/736x/26/8f/39/268f3921aa3abc42f44efc86f8fa0d7e.jpg"
  },
  {
    name: "Bright Minds School",
    rating: 3,
    image: "https://i.pinimg.com/1200x/64/52/f4/6452f4f22ad6dccf7355984635138cb5.jpg"
  },
  {
    name: "Hope International School",
    rating: 2,
    image: "https://i.pinimg.com/1200x/67/76/d5/6776d5d1106a0afc8416a39deec3597a.jpg"
  },
  {
    name: "Sunrise International Academy",
    rating: 5,
    image: "https://i.pinimg.com/736x/80/25/95/802595b51c7dfc4ec06f7517b2609102.jpg"
  }
  ,{
    name: "Green Valley School",
    rating: 1,
    image: "https://i.pinimg.com/1200x/27/72/da/2772da9493ac6dae42138b0c01cfe5a6.jpg"
  }
];
const schoolCards = document.getElementById("school-cards");
const schoolCard = document.getElementById("school-card");
function renderSchools(list) {
schoolCards.innerHTML = "";
  list.forEach(school => {
    const card = schoolCard.cloneNode(true);//هاي معناها حط كل عناصر الكارد هاد ب كارد و هاي كارد تعتبر نسخه من السكول كارد عشان ابلش اعبيها 
    card.classList.remove("d-none");//هاي عشان اشيل انها ما بتنشاف زي كاني بحكي روح على الكلاسات الموجوده و الغي تاثير هاد الكلاس 
    card.querySelector(".school-img").src = school.image;
    card.querySelector(".school-name").textContent = school.name;
        const stars = card.querySelector(".school-stars");
    for (let i = 1; i <= 5; i++) {
      stars.innerHTML += i <= school.rating ? '<i class="fa-solid fa-star"></i>':'<i class="fa-regular fa-star"></i>';
    }
    if(school.rating==5){
  card.style.border="2px solid gold";
}
        schoolCards.appendChild(card);
  });
}
renderSchools(schools);
const searchInput = document.querySelector('input[type="search"]');
searchInput.addEventListener("input",()=>{
    const filterSchool= schools.filter(school=>
        school.name.includes(searchInput.value)
    )
    renderSchools(filterSchool)
})
const resetButton = document.getElementById("reset");
resetButton.addEventListener("click",()=>{
    renderSchools(schools);

})



