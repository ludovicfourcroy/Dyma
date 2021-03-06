import "./assets/styles/styles.scss";
import "./index.scss";
import { openModal } from "./assets/javascripts/modal.js";

const articleContainerElement = document.querySelector(".articles-container");
const categoriesContainerElement = document.querySelector(".categories");
const selectElement = document.querySelector("select");
let filter;
let articles;
let sortBy = "desc";

selectElement.addEventListener("change", (event) => {
  sortBy = selectElement.value;
  fetchArticle();
});

const createArticles = () => {
  const articlesDOM = articles
    .filter((article) => {
      if (filter) {
        return article.category === filter;
      } else {
        return true;
      }
    })
    .map((article) => {
      const articleDOM = document.createElement("div");
      articleDOM.classList.add("article");
      articleDOM.innerHTML = `
  <img
    src="${article.img}"
    alt="profile"
  />
  <h2>${article.title}</h2>
  <p class="article-author">${article.author} - ${new Date(
        article.createdAt
      ).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })}</p>
  <p class="article-content">
    ${article.content}
  </p>
  <div class="article-actions">
  <button class="btn btn-danger" data-id=${article._id} >Supprimer</button>
  <button class="btn btn-primary" data-id=${article._id} >modifier</button>
  </div>
  `;
      return articleDOM;
    });
  articleContainerElement.innerHTML = "";
  articleContainerElement.append(...articlesDOM);
  const deleteButtons = articleContainerElement.querySelectorAll(".btn-danger");
  const editButtons = articleContainerElement.querySelectorAll(".btn-primary");

  editButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const target = event.target;
      const articleId = target.dataset.id;
      location.assign(`/form.html?id=${articleId}`);
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const result = await openModal("etes vous sur de vouloir supprimer?");
      if (result === true) {
        try {
          const target = event.target;
          const articleId = target.dataset.id;
          const response = await fetch(
            `https://restapi.fr/api/article/${articleId}`,
            {
              method: "DELETE",
            }
          );
          const body = await response.json();
          console.log(body);
          fetchArticle();
        } catch (e) {
          console.log("e : ", e);
        }
      }
    });
  });
};

const displayMenuCategories = (categoriesArr) => {
  const liElements = categoriesArr.map((categoryElem) => {
    const li = document.createElement("li");
    li.innerHTML = `${categoryElem[0]} (<strong> ${categoryElem[1]} </strong> )`;
    if (categoryElem[0] === filter) {
      li.classList.add("active");
    }
    li.addEventListener("click", () => {
      if (filter === categoryElem[0]) {
        filter = null;
        li.classList.remove("active");
        createArticles();
      } else {
        filter = categoryElem[0];
        liElements.forEach((li) => {
          li.classList.remove("active");
        });
        li.classList.add("active");
        createArticles();
      }
    });
    return li;
  });
  categoriesContainerElement.innerHTML = "";
  categoriesContainerElement.append(...liElements);
};

const createMenuCategories = () => {
  const categories = articles.reduce((acc, article) => {
    if (acc[article.category]) {
      acc[article.category]++;
    } else {
      acc[article.category] = 1;
    }
    return acc;
  }, {});
  const categoriesArr = Object.keys(categories)
    .map((category) => {
      return [category, categories[category]];
    })
    .sort((c1, c2) => c1[0].localeCompare(c2[0]));
  displayMenuCategories(categoriesArr);
};
const fetchArticle = async () => {
  try {
    const response = await fetch(
      `https://restapi.fr/api/article?sort=createdAt:${sortBy}`
    );
    articles = await response.json();
    createArticles();
    createMenuCategories();
  } catch (e) {
    console.log("e : ", e);
  }
};

fetchArticle();

const obj = {
  key: "value",
};
Object.defineProperty(obj, "key", {
  writable: false,
  enumerable: false,
});

const descriptor = Object.getOwnPropertyDescriptor(obj, "key");

console.log(descriptor);
// obj.key = "value2";

// console.log(obj);
for (let key in obj) {
  console.log(key);
}

const user = {
  firstname: "tintin",
  lastname: "milou",
  get fullname() {
    return this.firstname + "" + this.lastname;
  },
  set fullname(value) {
    [this.firstname, this.lastname] = value.split(" ");
  },
};

user.fullname = "foo";
console.log(user.fullname);

// const car = {
//   brand: "tesla",
//   roues: 4,
//   hasEngine: true,
// };

// const renault = {
//   brand: "renault",
//   roues: 4,
//   hasEngine: true,
// };

const tesla = new Car("tesla");
const renault = new Car("renault");

function Car(brand) {
  this.brand = brand;
  this.roues = 4;
  this.hasEngine = true;
}

console.log(tesla);
console.log(renault);

const vehicule = {
  hasEngine: true,
  start() {
    console.log("vrouuum!!!");
  },
};
const car = {
  brand: "tesla",
};

car.__proto__ = vehicule;

const engine = {
  power: 240,
};

const bus = {
  brand: "volvo",
};

bus.__proto__ = vehicule;

vehicule.__proto__ = engine;

console.log(car);
console.log(car.hasEngine);
car.start();
console.log(car.power);
console.log(engine.power);

console.log(car);

function hello() {}

hello.foo = () => {
  console.log("foo");
};

// const foo = {
//   test: 1,
// };

// console.log(Object.entries(foo));
// // Object.freeze(foo);

// foo.test = 2;
// Object.values(foo);

// foo.bar = 3;

class Foo {
  constructor(name) {
    this.name = name;
  }
  hello() {
    console.log("hello");
  }

  hi() {
    console.log("hi");
  }
}

const foo = new Foo();

const bar = new Bar("bar");

console.log(bar);

function Bar(name) {
  this.name = name;
}

Bar.prototype.hello = function () {
  console.log("hello");
};

Bar.prototype.hi = function () {
  console.log("hi");
};
