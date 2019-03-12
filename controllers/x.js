const getFruit = async name => {
  const fruits = {
    pineapple: 'pineapple',
    peach: 'peach',
    strawberry: 'strawberry'
  };

  return fruits[name];
};

const fruits = ['peach', 'pineapple', 'strawberry'];

const fruitLoop = async () => {
  for (const f of fruits) {
    const emoji = await getFruit(f);
    console.log(emoji);
  }
};


fruitLoop()

// console.log(fruitLoopFunc)