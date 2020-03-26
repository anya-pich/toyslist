const db = require('./models');

const users = [
    {
        name: 'Bob',
        email: 'bob@gmail.com',
        phone: '415-777-7777',
        zipcode: '94111',
        toys: [
            {
                title: 'lego tower',
                description: 'Est aliqua Lorem commodo incididunt reprehenderit nisi minim non voluptate.',
                images: ['https://images.unsplash.com/photo-1575650980117-a9383476a9b4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=150'],
                price: 'Free',
                ageTag: '3+',
                genderTag: 'all'
            }
        ]
    },
    {
        name: 'Daphne',
        email: 'daphne@gmail.com',
        phone: '415-666-7777',
        zipcode: '94111',
        toys: [
            {
                title: 'captain america',
                description: 'Tempor ut cupidatat ad sunt do anim anim.',
                images: ['https://images.unsplash.com/photo-1573405202162-52ba7a3e0377?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=150'],
                price: '$3.99',
                ageTag: '3+',
                genderTag: 'girls'
            },
            {
                title: 'head in a lego desert',
                description: 'Esse ipsum adipisicing pariatur id sit laboris duis consectetur Lorem nisi Lorem elit.',
                images: ['https://images.unsplash.com/photo-1576234433118-5839cb2f6450?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=150'],
                price: 'Free',
                ageTag: '5+',
                genderTag: 'all'
            },
            {
                title: 'so many lego people',
                description: 'Elit est dolor ad laborum ipsum cupidatat ad laboris magna Lorem amet dolor in nostrud.',
                images: ['https://images.unsplash.com/photo-1520627977056-c307aeb9a625?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=150'],
                price: '$15.00',
                ageTag: '5+',
                genderTag: 'all'
            }
        ]
    },
    {
        name: 'Jo',
        email: 'jo@gmail.com',
        phone: '415-555-7777',
        zipcode: '94222',
        toys: [
            {
                title: 'zoo animals',
                description: 'Lorem proident esse ex excepteur. In aliqua cillum eu exercitation dolore mollit. Deserunt irure in eu duis. In nostrud proident velit irure adipisicing. Incididunt fugiat anim proident sint esse minim consequat sunt.',
                images: ['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=150'],
                price: '$5.00',
                ageTag: '0+',
                genderTag: 'all'
            },
            {
                title: 'creepy dolls',
                description: 'Dolore sit duis proident consectetur Lorem laboris nulla enim adipisicing. Cupidatat dolor incididunt consectetur enim laboris. Amet velit irure magna reprehenderit id mollit cillum ullamco nulla mollit ea mollit. Dolore incididunt aute eiusmod quis veniam esse sit laboris qui. In labore dolor reprehenderit minim reprehenderit nostrud pariatur sint ipsum occaecat adipisicing est in laboris. Mollit eu cillum ut ex incididunt irure in voluptate ad ullamco.',
                images: ['https://images.unsplash.com/photo-1514313841118-4b0b61788b36?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=150'],
                price: 'Free',
                ageTag: '3+',
                genderTag: 'boys'
            },
            {
                title: 'retro cars',
                description: '',
                images: ['https://images.unsplash.com/photo-1559761802-58bfe58ea7a9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=150'],
                price: '$20.00',
                ageTag: '5+',
                genderTag: 'girls'
            }
        ]
    },
    {
        name: 'Uneeq',
        email: 'uneeq@gmail.com',
        phone: '415-999-7777',
        zipcode: '94111',
        toys: [
            {
                title: 'lego darth vader',
                description: 'Qui adipisicing voluptate nostrud cupidatat amet laborum ea commodo officia magna velit fugiat elit. Adipisicing fugiat cillum fugiat nostrud ex reprehenderit non elit dolor. Exercitation enim aliqua sit do commodo. Ipsum et culpa ipsum officia cillum nostrud est incididunt. Quis aliqua incididunt ad id labore.',
                images: ['https://images.unsplash.com/photo-1517242027094-631f8c218a0f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=150'],
                price: '$15.00',
                ageTag: '5+',
                genderTag: 'all'
            },
            {
                title: 'rusty jeep',
                description: 'Et proident aliqua elit occaecat amet eiusmod nostrud commodo enim tempor laboris anim. Sit ipsum magna anim et non incididunt excepteur laboris ipsum id duis labore elit aliqua. Do nisi id aute id ad mollit. Ut aliquip commodo do labore. Officia nostrud adipisicing duis irure sit anim culpa.',
                images: ['https://images.unsplash.com/photo-1534251019763-5a18f8999cc0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=150'],
                price: 'Free',
                ageTag: '10+',
                genderTag: 'girls'
            }
        ]
    },
    {
        name: 'Hamza',
        email: 'hamza@hotmail.com',
        phone: '415-888-7777',
        zipcode: '94222',
        toys: [
            {
                title: 'social media kit',
                description: 'Quis velit ex exercitation do veniam nulla aliqua magna deserunt nostrud et in duis. Enim ea eiusmod et qui ullamco laborum aute ipsum. Sit veniam voluptate tempor nostrud nulla voluptate dolore incididunt et.',
                images: ['https://images.unsplash.com/photo-1569775126345-c5222baf55a4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=150'],
                price: 'Priceless',
                ageTag: '0+',
                genderTag: 'all'
            },
            {
                title: 'lego emoji',
                description: 'Commodo enim consectetur elit commodo nisi dolor qui sunt eiusmod in fugiat. Non Lorem laboris consectetur do excepteur ut occaecat id cillum sunt enim veniam. Velit velit ullamco sit esse irure. Et quis nisi anim nisi amet enim ut nostrud fugiat enim nisi enim aute. Sit ea in culpa ex ex dolore Lorem exercitation veniam culpa deserunt occaecat duis.',
                images: ['https://images.unsplash.com/photo-1560529177-261a781ad3b3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=150'],
                price: '$18.00',
                ageTag: '5+',
                genderTag: 'all'
            },
            {
                title: 'steampunk mario figurines',
                description: 'Voluptate sit consequat cupidatat nulla id in consectetur amet qui commodo pariatur. Sunt tempor non amet non eu do amet culpa. Exercitation in commodo dolor officia elit exercitation nulla tempor. Dolor nulla est duis occaecat et do labore. Sunt magna quis duis voluptate cupidatat.',
                images: ['https://images.unsplash.com/photo-1566576912302-723145d39b00?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=150'],
                price: '$40.00',
                ageTag: '2+',
                genderTag: 'girls'
            }
        ]
    }
];

// https://source.unsplash.com/100x100/?toys

db.Profile.deleteMany({}, (err, result) => {
    if (err) {
      console.log(err);
      process.exit();
    }
  
    console.log(`Successfully deleted ${result.deletedCount} profiles.`);
  
    db.Profile.create(users, (err, newProfiles) => {
      if (err) {
        console.log(err);
        process.exit();
      }
  
      console.log(`Successfully created ${newProfiles.length} profiles.`);
      process.exit();
    });
});

  // run node seed in terminal before starting server to populate database



//   {
//     "name": "Juju",
//     "email": "juju@gmail.com",
//     "phone": "415-999-1234",
//     "zipcode": 94222,
//     "toys": [
//         {
//             "title": "bike",
//             "description": "My old bicycle.",
//             "images": ["https://source.unsplash.com/100x100/?bike"],
//             "price": "Priceless",
//             "ageTag": "10+",
//             "genderTag": "None"
//         }
//     ]
// }