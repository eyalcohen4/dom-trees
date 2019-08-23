function generateTestTrees() {
  // dummy HTML trees
  const htmls = [
    `
      <div>
        <img></img>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li id="findme"></li>
          <li></li>
        </ul>
      </div>
    `,
    `
      <article>
        <h1></h1>
        <p></p>
        <div>
          <img id="findme"></img>
        </div>
      </article>
    `,
    `
      <div>
        <p>
          <span></span>
          <span></span>
        </p>
        <p>
          <span></span>
          <span></span>
        </p>
        <p>
          <span></span>
          <span id="findme"></span>
        </p>
        <p>
          <span></span>
          <span></span>
        </p>
      </div>
    `
  ];

  return htmls.map((html, index) => {
    const doc = new DOMParser().parseFromString(html, "text/xml");
    const root = doc.children[0];
    let desiredNode;

    if (index === 0) {
      desiredNode = root.children[1].children[3];
    } else if (index === 1) {
      desiredNode = root.children[2].children[0];
    } else if (index === 2) {
      desiredNode = root.children[2].children[1];
    }

    return {
      tree: doc,
      copy: doc,
      element: desiredNode
    };
  });
}

function find(target, copy) {
  const paths = getPaths(target);
  let cursor = copy;

  paths.map(index => {
    // traverse down to children[index]
    if (cursor && cursor.children) {
      cursor = cursor.children.item(index);
    } else {
      // cursor does not have children
      cursor = undefined;
    }
  });

  return cursor;
}

function getPaths(target) {
  const indexes = [];
  let cursor = target;

  while (cursor && cursor.parentNode) {
    // Convert html collection to array
    // and find the current cursor node index relative to his siblings
    const index = [...cursor.parentNode.children].indexOf(cursor);
    indexes.push(index);

    cursor = cursor.parentNode;
  }

  // reversing because we assume the search will be top-down
  return indexes.reverse();
}

const trees = generateTestTrees();

trees.map(({ tree, element, copy }, index) => {
  console.log(`
    ====== Tree number ${index} ======
  `);
  console.log("The tree", tree);
  console.log("The target elemnt to find", element);

  const foundedElement = find(element, copy);

  if (!foundedElement) {
    console.log("failed to find the target element");
    return;
  }

  console.log("The founded element: ", foundedElement);
  console.log("Is found the correct element: ", foundedElement.id === "findme");
});
