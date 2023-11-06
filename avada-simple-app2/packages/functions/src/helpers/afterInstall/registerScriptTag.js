const registerScriptTag = async shopify => {
    // await shopify.scriptTag.create({
    //     event: 'onload',
    //     src: 'https://localhost:3000/scripttag/avada-sale-pop.min.js'
    // });

    const listScriptTags = await shopify.scriptTag.list();
    // await shopify.scriptTag.delete(186054279251);
    console.log('List scriptTags :', listScriptTags);
};

export default registerScriptTag;
