const registerScriptTag = async shopify => {
  // await shopify.scriptTag.create({
  //   event: 'onload',
  //   src: 'https://localhost:3000/scripttag/avada-sale-pop.min.js'
  // });
  // await shopify.scriptTag.delete(185927336019);
  const listScriptTags = await shopify.scriptTag.list();
  console.log('List scriptTags :', listScriptTags);
};

export default registerScriptTag;
