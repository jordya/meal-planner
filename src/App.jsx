import { useState, useCallback } from "react";

const DEFAULT_DINNERS = [
  {
    name: "Breakfast for Dinner", details: "pancakes, eggs and ham", sides: ["fresh fruit"],
    variations: ["Add blueberries or chocolate chips to the pancake batter", "Swap ham for turkey sausage patties", "Add everything bagel seasoning on the eggs", "Use buttermilk pancake mix for fluffier results"],
    ingredients: ["pancake mix", "eggs", "butter", "milk", "ham slices", "maple syrup", "fresh fruit"],
    prep: ["Mix pancake batter according to package directions.", "Cook ham slices in a skillet over medium heat until warmed through, about 2–3 min per side.", "Heat a griddle or nonstick pan over medium heat. Lightly butter and pour ¼ cup batter per pancake. Cook until bubbles form, then flip.", "Scramble or fry eggs to your preference.", "Serve everything together with maple syrup and fresh fruit on the side."]
  },
  {
    name: "BBQ Chicken", details: "rice, green beans", sides: [],
    variations: ["Try honey-chipotle BBQ sauce for a smoky-sweet kick", "Swap white rice for coconut rice", "Add a squeeze of lime and fresh cilantro over the top", "Use thighs instead of breasts for juicier results"],
    ingredients: ["chicken breasts or thighs", "BBQ sauce", "white rice", "green beans", "olive oil", "garlic", "salt & pepper"],
    prep: ["Preheat oven to 400°F or heat grill to medium-high.", "Season chicken with salt and pepper. Brush generously with BBQ sauce.", "Bake 20–25 min (or grill 6–7 min per side) until internal temp reaches 165°F. Brush with more sauce halfway through.", "Cook rice according to package directions.", "Steam or sauté green beans in olive oil and garlic for 5–7 min until tender-crisp.", "Let chicken rest 5 min before serving."]
  },
  {
    name: "Pork Chops", details: "asparagus, diced potatoes", sides: [],
    variations: ["Marinate in apple cider vinegar + garlic for 30 min before cooking", "Try a brown sugar & smoked paprika rub", "Swap asparagus for roasted Brussels sprouts", "Add a Dijon cream pan sauce after cooking"],
    ingredients: ["pork chops (bone-in or boneless)", "asparagus", "potatoes", "olive oil", "garlic", "butter", "salt & pepper", "Italian seasoning"],
    prep: ["Preheat oven to 425°F. Dice potatoes and toss with olive oil, salt, pepper, and garlic. Roast on a baking sheet for 20–25 min.", "Snap woody ends off asparagus. Toss with olive oil, salt, and pepper.", "Pat pork chops dry and season both sides. Sear in an oven-safe skillet over medium-high heat, 3 min per side until golden.", "Add asparagus to the pan and transfer to oven. Roast 10–12 min until pork reaches 145°F internal temp.", "Rest 3 min before serving alongside the potatoes."]
  },
  {
    name: "Hamburgers", details: "corn on the cob", sides: [],
    variations: ["Mix Worcestershire sauce and garlic powder into the patties", "Try smash burgers on a cast iron for crispy edges", "Add caramelized onions and mushrooms on top", "Swap buns for lettuce wraps for a lighter option"],
    ingredients: ["ground beef (80/20)", "hamburger buns", "lettuce", "tomato", "onion", "cheese slices", "condiments", "corn on the cob", "butter", "salt & pepper"],
    prep: ["Husk corn and boil in salted water 8–10 min, or grill in husks 15–20 min turning occasionally.", "Divide ground beef into equal portions (about ⅓ lb each). Form into patties slightly wider than the bun — they shrink as they cook.", "Season both sides with salt and pepper.", "Grill or pan-fry over medium-high heat, 3–4 min per side for medium. Add cheese in the last minute.", "Toast buns on the grill or in a pan. Build burgers with your toppings.", "Serve corn with butter, salt, and pepper."]
  },
  {
    name: "Turkey Brats", details: "baked beans", sides: [],
    variations: ["Simmer brats in beer or apple cider before grilling", "Top with sauerkraut and spicy mustard", "Add sautéed peppers and onions as a topping", "Stir a little bacon into the baked beans for depth"],
    ingredients: ["turkey brats", "brat buns", "mustard", "ketchup", "canned baked beans", "onion (optional)", "butter"],
    prep: ["Optional: Simmer brats in water or beer over medium heat for 10 min before grilling — this ensures they're cooked through.", "Heat grill or grill pan over medium-high. Grill brats 4–5 min per side until nicely browned.", "Warm baked beans in a small saucepan over low heat, stirring occasionally.", "Toast buns lightly on the grill.", "Serve brats in buns with mustard and ketchup, beans on the side."]
  },
  {
    name: "Spaghetti Marsala", details: "orange jello salad with mandarin oranges", sides: [],
    variations: ["Add a pinch of red pepper flakes to the Marsala sauce", "Finish with fresh parsley and a drizzle of olive oil", "Try with linguine or fettuccine instead of spaghetti", "Add sautéed mushrooms to the sauce"],
    ingredients: ["spaghetti", "Marsala cooking sauce or Marsala wine + jar of marinara", "ground beef or Italian sausage", "garlic", "olive oil", "orange jello", "mandarin oranges (canned)", "mini marshmallows", "whipped topping"],
    prep: ["Make jello salad first (it needs to set): prepare orange jello per box, stir in drained mandarin oranges. Chill in fridge until partially set, then fold in mini marshmallows and whipped topping. Refrigerate until firm.", "Cook spaghetti in salted boiling water until al dente. Drain and toss with a little olive oil.", "Brown ground beef in a large skillet over medium heat. Drain fat. Add garlic and cook 1 min.", "Stir in Marsala sauce. Simmer 10 min. Season to taste.", "Serve sauce over spaghetti with the jello salad on the side."]
  },
  {
    name: "Beef Fajitas", details: "Spanish rice", sides: [],
    variations: ["Marinate beef in lime juice, cumin, and garlic for 1 hour", "Add sliced avocado or guacamole", "Try with shrimp instead of beef for a change", "Char the peppers and onions in a very hot pan for restaurant-style flavor"],
    ingredients: ["flank steak or beef strips", "bell peppers (mixed colors)", "onion", "flour tortillas", "fajita seasoning", "lime", "cilantro", "shredded cheese", "sour cream", "Spanish rice mix", "olive oil"],
    prep: ["Slice beef against the grain into thin strips. Toss with fajita seasoning and a squeeze of lime. Let sit while you prep everything else.", "Cook Spanish rice according to package directions.", "Heat a large cast iron or heavy skillet over high heat until very hot. Add oil.", "Cook beef strips in a single layer for 2 min without stirring, then toss. Cook 2 more min. Remove from pan.", "In the same pan, cook sliced peppers and onions 4–5 min until charred and tender.", "Warm tortillas in the microwave (wrapped in a damp paper towel, 30 sec) or on the stovetop.", "Serve everything together — beef, peppers/onions, cheese, sour cream, lime wedges, cilantro."]
  },
  {
    name: "Turkey and Swiss Grilled Sandwiches", details: "spinach salad", sides: [],
    variations: ["Add a thin layer of cranberry sauce for a sweet contrast", "Try with sourdough or rye bread instead of regular", "Add sliced apple for crunch", "Swap Swiss for provolone and add a smear of pesto"],
    ingredients: ["deli turkey", "Swiss cheese", "bread (sourdough or sandwich)", "butter", "Dijon mustard", "baby spinach", "cherry tomatoes", "salad dressing", "olive oil"],
    prep: ["Make the spinach salad: toss baby spinach with cherry tomatoes, a drizzle of olive oil, and your dressing of choice. Set aside.", "Butter one side of each bread slice. Spread Dijon on the inside of each slice.", "Layer turkey and Swiss cheese between unbuttered sides.", "Cook in a skillet over medium heat, butter-side down. Press lightly with a spatula. Cook 3–4 min per side until golden and cheese is melted.", "Slice sandwiches diagonally and serve with the spinach salad."]
  },
  {
    name: "Tijuana Slow Cooker Pie", details: "", sides: ["side salad"],
    variations: ["Add a can of diced green chiles for heat", "Top with crushed Fritos instead of tortillas for crunch", "Stir in cream cheese near the end for a creamier filling", "Use enchilada sauce instead of diced tomatoes"],
    ingredients: ["ground beef or turkey", "taco seasoning", "canned diced tomatoes", "canned black beans", "shredded cheese", "tortillas or corn chips", "sour cream", "jalapeño", "onion", "salad greens & dressing"],
    prep: ["Brown ground meat in a skillet over medium heat. Drain fat. Add diced onion and cook 2–3 min.", "Stir in taco seasoning and a splash of water per package directions.", "Add drained black beans and diced tomatoes. Stir to combine.", "Transfer to slow cooker. Layer tortilla strips on top. Cook on low 4–6 hours or high 2–3 hours.", "In the last 20 min, sprinkle shredded cheese on top and replace lid.", "Serve with sour cream and jalapeño. Side salad on the side."]
  },
  {
    name: "Strip Steak Casserole", details: "potatoes, carrots, onions and wine", sides: [],
    variations: ["Add a sprig of fresh rosemary and thyme while braising", "Stir in a tablespoon of tomato paste for richness", "Add mushrooms in the last hour of cooking", "Deglaze with red wine then add beef broth for a deeper sauce"],
    ingredients: ["strip steak (cut into chunks)", "potatoes", "carrots", "onions", "red wine", "beef broth", "garlic", "butter", "olive oil", "salt & pepper", "fresh herbs (optional)"],
    prep: ["Preheat oven to 325°F. Pat steak chunks dry and season generously with salt and pepper.", "Heat oil in a Dutch oven over high heat. Sear beef in batches until browned on all sides, about 3–4 min. Remove and set aside.", "Reduce heat to medium. Add onions and garlic, cook 3 min. Deglaze with red wine, scraping up brown bits.", "Add beef broth, carrots, and potatoes. Return beef to pot. Liquid should almost cover everything.", "Cover and braise in oven 1.5–2 hours until beef is fork-tender.", "Taste and adjust seasoning. Serve in bowls with crusty bread if desired."]
  },
  {
    name: "Lasagna", details: "corn", sides: ["garlic bread"],
    variations: ["Mix Italian sausage with ground beef for more flavor", "Add a layer of roasted zucchini or spinach", "Try a béchamel layer in addition to ricotta", "Sprinkle Italian seasoning and red pepper flakes between layers"],
    ingredients: ["lasagna noodles", "ground beef or Italian sausage", "marinara sauce (jar)", "ricotta cheese", "mozzarella (shredded)", "Parmesan", "eggs", "garlic", "Italian seasoning", "garlic bread", "canned corn"],
    prep: ["Preheat oven to 375°F. Cook lasagna noodles per package (or use no-boil). Drain and lay flat on oiled foil.", "Brown meat in a skillet. Drain fat. Add marinara and simmer 10 min.", "Mix ricotta with 1 egg, half the Parmesan, and a pinch of Italian seasoning.", "Layer in a 9x13 pan: thin sauce layer → noodles → ricotta mix → meat sauce → mozzarella. Repeat. Top with noodles, remaining sauce, and mozzarella.", "Cover with foil and bake 45 min. Uncover and bake 15 more min until bubbly.", "Rest 10–15 min before cutting. Heat corn and garlic bread while lasagna rests."]
  },
  {
    name: "Chicken Patty Sandwiches", details: "rice and peas", sides: [],
    variations: ["Add buffalo sauce and blue cheese crumbles", "Top with coleslaw for crunch", "Try a honey mustard or ranch drizzle", "Add pickles and garlic aioli for a Nashville-style vibe"],
    ingredients: ["frozen chicken patties", "sandwich buns", "lettuce", "tomato", "cheese slices", "condiments (mayo, mustard, ketchup)", "white rice", "canned peas", "butter"],
    prep: ["Cook rice according to package directions.", "Bake or air-fry chicken patties per package directions (typically 400°F for 18–20 min, flipping halfway).", "Warm peas in a small saucepan with a pat of butter. Season with salt.", "Toast buns in the oven during the last 2 min of patty cooking.", "Build sandwiches with cheese, lettuce, tomato, and condiments.", "Serve with rice and peas on the side."]
  },
  {
    name: "Turkey Pepperoni Pizza", details: "", sides: ["side salad"],
    variations: ["Add banana peppers and black olives", "Brush the crust with garlic butter before baking", "Use a pesto base instead of red sauce", "Add fresh basil after it comes out of the oven"],
    ingredients: ["pizza dough or pre-made crust", "pizza sauce", "mozzarella cheese", "turkey pepperoni", "Italian seasoning", "olive oil", "salad greens & dressing"],
    prep: ["Preheat oven to 450°F (or per dough package). If using raw dough, let it rest at room temp 30 min.", "Stretch or roll dough on a lightly oiled pizza pan or baking sheet.", "Spread pizza sauce evenly, leaving a 1-inch border.", "Top with mozzarella, turkey pepperoni, and a sprinkle of Italian seasoning.", "Bake 12–15 min until crust is golden and cheese is bubbly.", "Cool 2–3 min before slicing. Serve with side salad."]
  },
  {
    name: "Ham, Egg and Swiss Pizza", details: "", sides: ["side salad"],
    variations: ["Add caramelized onions for sweetness", "Use a cream cheese or Alfredo base instead of red sauce", "Top with arugula and a drizzle of honey after baking", "Add everything bagel seasoning to the crust"],
    ingredients: ["pizza dough or pre-made crust", "pizza sauce or Alfredo sauce", "Swiss cheese (shredded)", "diced ham", "eggs (3–4)", "olive oil", "salad greens & dressing"],
    prep: ["Preheat oven to 450°F. Stretch dough on an oiled pan.", "Spread sauce thinly over dough.", "Layer Swiss cheese and diced ham evenly.", "Create small wells in the toppings and crack an egg into each well.", "Bake 12–15 min until whites are just set and crust is golden.", "Finish with fresh cracked pepper. Slice and serve with side salad."]
  },
  {
    name: "Stroganoff", details: "peas", sides: [],
    variations: ["Add a splash of Worcestershire and a teaspoon of Dijon for depth", "Use Greek yogurt instead of sour cream for a lighter version", "Try with ground turkey instead of beef", "Add sliced mushrooms — they're traditional and really add to the dish"],
    ingredients: ["ground beef or beef strips", "egg noodles", "cream of mushroom soup", "sour cream", "beef broth", "onion", "garlic", "butter", "Worcestershire sauce", "canned peas", "salt & pepper"],
    prep: ["Cook egg noodles per package. Drain and toss with butter.", "Brown beef in a large skillet over medium-high heat. Drain fat. Add onion and garlic, cook 2–3 min.", "Stir in cream of mushroom soup, beef broth, and Worcestershire. Simmer 5–7 min.", "Remove from heat. Stir in sour cream — don't boil after adding or it may curdle.", "Warm peas in a small saucepan or microwave.", "Serve stroganoff sauce over egg noodles with peas on the side."]
  },
  {
    name: "Tacos", details: "corn and black beans", sides: [],
    variations: ["Try pickled red onion as a topping — easy and elevates everything", "Use cotija cheese instead of shredded for authenticity", "Add mango salsa for a sweet-heat contrast", "Try flour and corn tortillas side by side and let everyone choose"],
    ingredients: ["ground beef or chicken", "taco seasoning", "taco shells or tortillas", "shredded cheese", "sour cream", "lettuce", "tomato", "onion", "lime", "cilantro", "canned corn", "canned black beans"],
    prep: ["Brown ground meat in a skillet over medium heat. Drain fat.", "Add taco seasoning and water per package. Stir and simmer 3–4 min until sauce thickens.", "Warm taco shells in oven at 350°F for 5 min, or warm tortillas in a dry skillet.", "Drain and warm corn and black beans together in a small saucepan.", "Set up a toppings station: shredded lettuce, diced tomato, cheese, sour cream, lime wedges, cilantro.", "Let everyone build their own tacos."]
  },
  {
    name: "Fiesta Chicken Salad Wraps", details: "", sides: ["fruit"],
    variations: ["Add a chipotle-lime crema (sour cream + chipotle + lime juice)", "Try with a mango-avocado salsa inside", "Add crunchy tortilla strips for texture", "Swap the wrap for a burrito bowl format over rice"],
    ingredients: ["chicken breast", "taco seasoning", "flour tortillas (large)", "romaine lettuce", "tomato", "avocado", "shredded cheese", "canned black beans", "canned corn", "ranch or chipotle dressing", "lime", "olive oil"],
    prep: ["Season chicken with taco seasoning. Cook in a skillet over medium heat with olive oil, 6–7 min per side until cooked through. Let rest 5 min, then slice or shred.", "Drain and rinse black beans and corn. Warm in a small pan if desired.", "Dice tomato and avocado. Chop romaine.", "Warm tortillas 20–30 sec in the microwave.", "Build wraps: layer lettuce, chicken, beans, corn, tomato, avocado, cheese, and a drizzle of dressing.", "Fold bottom up, then roll tightly. Serve with fresh fruit."]
  },
  {
    name: "Easy Mac N' Cheese with Ham and Peas", details: "", sides: ["fruit"],
    variations: ["Stir in a little cream cheese for extra richness", "Add a dash of hot sauce or smoked paprika", "Top with buttery breadcrumbs and broil for 2 min", "Mix in diced jalapeños for a kick"],
    ingredients: ["boxed mac & cheese (deluxe style)", "diced ham", "canned or frozen peas", "butter", "milk", "fresh fruit"],
    prep: ["Cook pasta per package directions. Drain.", "Return pasta to pot over low heat. Add butter, milk, and cheese sauce packet — stir until creamy.", "Stir in diced ham and peas. Cook 2–3 min until warmed through.", "Season with black pepper to taste.", "Serve with fresh fruit on the side."]
  },
  {
    name: "Spaghetti with Beef", details: "green beans", sides: ["garlic bread"],
    variations: ["Add Italian sausage alongside the ground beef", "Stir in a splash of red wine while browning the meat", "Finish with fresh basil and a drizzle of good olive oil", "Add red pepper flakes and a Parmesan rind while simmering the sauce"],
    ingredients: ["spaghetti", "ground beef", "marinara sauce (jar)", "garlic", "olive oil", "Parmesan", "Italian seasoning", "green beans", "garlic bread", "red pepper flakes (optional)"],
    prep: ["Cook spaghetti in salted boiling water until al dente. Drain, reserving ½ cup pasta water.", "Brown ground beef in a large skillet. Drain fat. Add minced garlic and cook 1 min.", "Add marinara sauce. Simmer 10–15 min, stirring occasionally. Add a splash of pasta water if too thick.", "Steam or microwave green beans until tender-crisp. Season with olive oil and salt.", "Bake or microwave garlic bread per package directions.", "Serve sauce over spaghetti, topped with Parmesan."]
  },
  {
    name: "BBQ Chicken Pizza", details: "", sides: ["side salad"],
    variations: ["Add jalapeños for heat", "Swap mozzarella for smoked gouda", "Add pineapple if the family is into it", "Brush the crust with garlic butter before baking"],
    ingredients: ["pizza dough or pre-made crust", "BBQ sauce", "cooked chicken breast (shredded or diced)", "mozzarella cheese", "red onion", "cilantro", "olive oil", "salad greens & dressing"],
    prep: ["Preheat oven to 450°F. If using raw dough, let rest 30 min at room temp.", "Shred or dice cooked chicken (rotisserie works great). Toss with a spoonful of BBQ sauce.", "Stretch dough on an oiled pan. Spread a thin layer of BBQ sauce as the base.", "Top with mozzarella, chicken, and thinly sliced red onion.", "Bake 12–15 min until crust is golden and cheese is bubbling.", "Top with fresh cilantro after baking. Serve with side salad."]
  },
  {
    name: "Thai Chicken Wraps", details: "", sides: ["fruit"],
    variations: ["Add crushed peanuts and sesame seeds on top", "Try a spicy sriracha-peanut sauce", "Add mango slices for a sweet contrast", "Swap chicken for ground turkey with ginger and garlic stir-fried in"],
    ingredients: ["chicken breast", "flour tortillas (large)", "shredded cabbage", "carrots (shredded)", "cucumber", "cilantro", "lime", "peanut sauce (bottled or homemade)", "soy sauce", "sesame oil"],
    prep: ["Slice chicken into thin strips. Cook in a skillet over medium-high heat with sesame oil and soy sauce, 5–6 min until cooked through.", "Thinly slice cucumber. Shred cabbage and carrots if not pre-shredded.", "Warm tortillas briefly in a dry pan or microwave.", "Spread a spoonful of peanut sauce on each tortilla.", "Layer chicken, cabbage, carrots, cucumber, and cilantro.", "Squeeze fresh lime juice over filling. Roll tightly and serve with fresh fruit."]
  },
  {
    name: "Taco Salad", details: "", sides: ["fruit"],
    variations: ["Press a tortilla into a bowl and bake it for a taco bowl vessel", "Add pickled jalapeños and cotija cheese", "Try a cilantro-lime vinaigrette instead of sour cream", "Top with crushed Doritos for extra crunch"],
    ingredients: ["ground beef or chicken", "taco seasoning", "romaine lettuce", "tomato", "avocado", "shredded cheese", "sour cream", "salsa", "tortilla chips", "canned black beans", "canned corn", "lime"],
    prep: ["Brown ground meat in a skillet. Drain fat. Add taco seasoning and water per package, cook 3–4 min.", "Chop romaine, dice tomato and avocado.", "Drain and rinse black beans and corn.", "Assemble salads in large bowls: romaine base, then meat, beans, corn, tomato, avocado, and cheese.", "Top with tortilla chips for crunch, a dollop of sour cream, salsa, and a squeeze of lime."]
  },
  {
    name: "Chicken Parmesan", details: "green beans", sides: ["pasta"],
    variations: ["Pound the chicken thin for faster, crispier results", "Use panko breadcrumbs for extra crunch", "Add fresh basil and a drizzle of balsamic glaze on top", "Try with fresh mozzarella slices instead of shredded"],
    ingredients: ["chicken breasts", "Italian breadcrumbs (or panko)", "eggs", "marinara sauce", "mozzarella cheese", "Parmesan", "pasta", "green beans", "olive oil", "garlic", "Italian seasoning"],
    prep: ["Preheat oven to 400°F. Pound chicken to even ¾-inch thickness.", "Set up breading station: beaten eggs in one dish, breadcrumbs mixed with Parmesan and Italian seasoning in another.", "Dip chicken in egg, then breadcrumbs. Press to adhere.", "Heat oil in an oven-safe skillet over medium-high. Sear chicken 3 min per side until golden.", "Spoon marinara over each piece. Top with mozzarella. Transfer to oven and bake 15 min.", "Cook pasta in salted water. Steam green beans. Serve chicken over pasta with green beans on the side."]
  },
  {
    name: "Ham and Hashbrown Hotdish", details: "", sides: ["fruit"],
    variations: ["Add diced onion and bell pepper for more flavor", "Top with French's crispy onions before the last 10 min of baking", "Stir in a little sour cream for tang", "Try with pepper jack cheese instead of cheddar"],
    ingredients: ["frozen hash browns (shredded)", "diced ham", "cream of mushroom soup", "shredded cheddar cheese", "sour cream", "butter", "onion (optional)", "salt & pepper", "fresh fruit"],
    prep: ["Preheat oven to 350°F. Grease a 9x13 baking dish.", "In a large bowl, mix cream of mushroom soup, sour cream, half the cheese, and a pinch of salt and pepper.", "Stir in frozen hash browns and diced ham until evenly coated.", "Spread into prepared dish. Top with remaining cheese.", "Bake uncovered 60–70 min until top is golden and edges are bubbling.", "Let rest 5 min before serving. Serve with fresh fruit."]
  },
  {
    name: "Chicken BLT Salad/Wraps", details: "", sides: [],
    variations: ["Add avocado and chipotle ranch dressing", "Try with a sun-dried tomato wrap instead of plain flour tortilla", "Add hard-boiled egg slices", "Swap romaine for a spring mix for more flavor complexity"],
    ingredients: ["chicken breast", "bacon", "romaine lettuce", "tomato", "avocado", "shredded cheese", "ranch dressing", "flour tortillas or bread", "olive oil", "salt & pepper"],
    prep: ["Cook bacon in a skillet over medium heat until crispy. Drain on paper towels and crumble.", "Season chicken with salt and pepper. Cook in the same skillet (or on the grill) 6–7 min per side until cooked through. Let rest, then slice.", "Chop romaine, dice tomato and avocado.", "For wraps: warm tortillas, layer romaine, chicken, bacon, tomato, avocado, cheese, and ranch. Roll tightly.", "For salad: toss romaine with all toppings and ranch dressing, topped with chicken and bacon."]
  },
  {
    name: "Foil Pack Chicken", details: "mushroom soup and peas", sides: [],
    variations: ["Add sliced bell peppers and onions in the pack", "Season with Italian dressing mix before sealing", "Add diced potatoes to make it a complete meal in one pack", "Add a pat of butter and fresh thyme inside each pack"],
    ingredients: ["chicken breasts", "cream of mushroom soup", "frozen peas", "butter", "garlic", "olive oil", "Italian seasoning", "salt & pepper", "heavy-duty foil"],
    prep: ["Preheat oven to 400°F (or heat grill to medium).", "Tear large sheets of foil (one per person). Place a chicken breast in the center of each.", "Spoon 2–3 tbsp cream of mushroom soup over each breast. Add a handful of frozen peas. Top with a pat of butter and a sprinkle of Italian seasoning.", "Fold foil up and over, sealing tightly into packets.", "Bake 25–30 min (or grill 20–25 min). Carefully open packets — steam is very hot.", "Serve directly in the foil or plate. Spoon the sauce over everything."]
  },
  {
    name: "Country Pie", details: "", sides: ["green salad"],
    variations: ["Add a layer of mashed potatoes on top instead of a second crust", "Stir in a can of diced green chiles for heat", "Add shredded cheddar between layers", "Season meat with smoked paprika and cumin for a Southwestern flair"],
    ingredients: ["ground beef or pork sausage", "refrigerated pie crust (2 sheets)", "onion", "garlic", "Worcestershire sauce", "shredded cheddar (optional)", "salt & pepper", "salad greens & dressing"],
    prep: ["Preheat oven to 375°F.", "Brown ground meat with diced onion in a skillet. Drain fat. Add garlic and Worcestershire. Season with salt and pepper. Cool slightly.", "Press one pie crust into a 9-inch pie dish. Fill with meat mixture. Top with cheese if using.", "Cover with second pie crust. Crimp edges, cut a few slits on top for steam vents.", "Bake 35–40 min until crust is golden brown.", "Let rest 10 min before slicing. Serve with green salad."]
  },
  {
    name: "Asian Beef Stir-Fry", details: "", sides: ["rice"],
    variations: ["Add a spoonful of chili garlic sauce for heat", "Finish with toasted sesame seeds and sliced green onion", "Try rice noodles or lo mein noodles instead of rice", "Add a soft-fried egg on top of each bowl"],
    ingredients: ["beef strips (sirloin or flank)", "broccoli", "bell peppers", "snap peas", "carrots", "green onion", "garlic", "ginger", "soy sauce", "sesame oil", "oyster sauce", "cornstarch", "white rice"],
    prep: ["Cook rice per package directions.", "Slice beef thin against the grain. Toss with 1 tbsp soy sauce and 1 tsp cornstarch.", "Mix sauce: 3 tbsp soy sauce, 1 tbsp oyster sauce, 1 tsp sesame oil, 1 tsp cornstarch, splash of water.", "Heat a wok or large skillet over high heat until smoking. Add oil, then beef. Cook undisturbed 1–2 min, then toss. Remove beef.", "In same pan, stir-fry garlic and ginger 30 sec. Add veggies. Cook 3–4 min over high heat.", "Return beef. Pour sauce over everything. Toss 1 min until sauce thickens. Serve over rice."]
  },
  {
    name: "Quick Fix Beef Burrito Skillet", details: "", sides: ["sour cream, salsa"],
    variations: ["Add diced green chiles and pepper jack cheese", "Stir in cream cheese at the end for a creamy texture", "Top with crushed tortilla chips for crunch", "Add a can of Rotel tomatoes for extra flavor"],
    ingredients: ["ground beef", "white rice", "taco seasoning", "canned black beans", "canned diced tomatoes", "shredded cheese", "sour cream", "salsa", "onion", "bell pepper", "garlic", "flour tortillas"],
    prep: ["Cook ground beef in a large oven-safe skillet over medium heat. Drain fat.", "Add diced onion, bell pepper, and garlic. Cook 3–4 min.", "Stir in taco seasoning, drained black beans, diced tomatoes (with liquid), and uncooked rice.", "Add 1½ cups water. Bring to a boil, then cover and reduce heat to low. Simmer 18–20 min until rice is cooked.", "Fluff and stir. Top with shredded cheese. Cover 2 min to melt.", "Serve with sour cream, salsa, and warm tortillas on the side."]
  },
  {
    name: "Tuna Melts", details: "cucumbers and carrots", sides: [],
    variations: ["Add diced celery and red onion to the tuna mix for crunch", "Try with avocado slices under the cheese", "Use sourdough for extra flavor", "Add a dash of Dijon mustard to the tuna mix"],
    ingredients: ["canned tuna (drained)", "bread (sourdough or sandwich)", "cheese slices (cheddar or Swiss)", "mayo", "relish", "butter", "cucumbers", "carrots", "salt & pepper", "lemon (optional)"],
    prep: ["Mix drained tuna with mayo, relish, salt, and pepper to taste. Add a squeeze of lemon if you have it.", "Spread tuna mixture on one side of each bread slice.", "Top with a cheese slice.", "Butter the outside of the bread. Cook in a skillet over medium heat, tuna-side up, 3–4 min until bottom is golden.", "Optionally, broil for 1–2 min to melt cheese on top instead of flipping.", "Slice cucumbers and carrots. Serve alongside the melts."]
  },
  {
    name: "Beefy One-Pot Dinner", details: "", sides: ["bread"],
    variations: ["Add a splash of soy sauce and Worcestershire for umami depth", "Stir in frozen peas and corn near the end", "Top with shredded cheddar before serving", "Add diced tomatoes for a more stew-like consistency"],
    ingredients: ["ground beef", "egg noodles or rice", "beef broth", "onion", "garlic", "carrots", "Worcestershire sauce", "butter", "salt & pepper", "crusty bread"],
    prep: ["Brown ground beef in a large pot over medium heat. Drain fat.", "Add diced onion, garlic, and carrots. Cook 4–5 min.", "Pour in beef broth and Worcestershire. Bring to a boil.", "Add egg noodles. Cook uncovered per noodle package time, stirring occasionally, until noodles are tender and liquid is mostly absorbed.", "Stir in butter. Season with salt and pepper.", "Serve in bowls with crusty bread."]
  },
  {
    name: "Ham and Cheesy Potatoes with Peas", details: "", sides: ["fruit"],
    variations: ["Add diced jalapeños for heat", "Top with French's crispy onions for crunch", "Use pepper jack in addition to cheddar", "Add a little Dijon mustard to the cheese sauce for tang"],
    ingredients: ["potatoes (diced or sliced)", "diced ham", "canned peas", "shredded cheddar cheese", "butter", "sour cream", "onion", "salt & pepper", "garlic powder", "fresh fruit"],
    prep: ["Preheat oven to 375°F. Grease a baking dish.", "Dice potatoes into ½-inch cubes (or slice thin). Toss with butter, garlic powder, salt, and pepper.", "Layer potatoes in baking dish. Scatter diced ham and onion over top.", "Mix sour cream with a handful of cheese. Dollop over the casserole.", "Cover with foil and bake 40 min. Uncover, top with remaining cheese, bake 15 more min until bubbly.", "Warm peas and serve alongside with fresh fruit."]
  },
  {
    name: "Crockpot Roast", details: "potatoes, carrots and onions + onion soup", sides: [],
    variations: ["Add a can of golden mushroom soup alongside the onion soup", "Throw in a sprig of fresh rosemary and thyme", "Add baby bella mushrooms in the last 2 hours", "Use balsamic vinegar + garlic as a marinade the night before"],
    ingredients: ["chuck roast (2–3 lbs)", "potatoes", "carrots", "onions", "onion soup mix (packet)", "beef broth", "garlic", "Worcestershire sauce", "salt & pepper"],
    prep: ["Season roast generously with salt and pepper on all sides.", "Place potatoes (quartered), carrots (chunked), and onion wedges in the bottom of the slow cooker.", "Set roast on top of vegetables.", "Mix onion soup packet with beef broth and Worcestershire. Pour over roast.", "Cook on low 8–10 hours or high 4–5 hours until beef is fork-tender.", "Shred or slice beef. Serve with the vegetables and spoon juices over everything."]
  },
  {
    name: "Chicken Enchiladas", details: "red enchilada sauce, black beans, corn", sides: [],
    variations: ["Add cream cheese to the chicken filling for creaminess", "Try green enchilada sauce for a different flavor profile", "Top with a layer of sour cream before the final cheese layer", "Add pickled jalapeños inside for heat"],
    ingredients: ["chicken breast (cooked and shredded)", "corn tortillas", "red enchilada sauce (can)", "canned black beans", "canned corn", "shredded cheese (Mexican blend)", "sour cream", "onion", "garlic", "cilantro", "lime"],
    prep: ["Preheat oven to 375°F. Cook and shred chicken (poach in water 15 min, or use rotisserie).", "Mix shredded chicken with drained black beans, corn, half the cheese, and ½ cup enchilada sauce.", "Warm tortillas 30 sec in microwave so they don't crack when rolling.", "Spoon filling into each tortilla. Roll tightly and place seam-side down in a greased 9x13 dish.", "Pour remaining enchilada sauce over the top. Sprinkle with remaining cheese.", "Bake 20–25 min until cheese is melted and bubbling. Garnish with cilantro and sour cream."]
  },
  {
    name: "Bruschetta Chicken Bake", details: "", sides: ["pasta or bread"],
    variations: ["Add a balsamic glaze drizzle right before serving", "Use fresh mozzarella instead of shredded", "Add pine nuts for crunch and richness", "Marinate chicken in Italian dressing the night before"],
    ingredients: ["chicken breasts", "mozzarella cheese", "Parmesan", "tomatoes (diced)", "garlic", "fresh basil", "Italian dressing", "balsamic glaze", "pasta or baguette", "olive oil", "salt & pepper"],
    prep: ["Preheat oven to 400°F. Place chicken in a greased baking dish. Pour Italian dressing over chicken.", "Mix diced tomatoes with minced garlic, olive oil, salt, pepper, and half the basil.", "Bake chicken 20 min. Remove from oven. Top each breast with tomato mixture and mozzarella.", "Return to oven for 10–15 min until chicken reaches 165°F and cheese is golden.", "Cook pasta if serving with, or slice a baguette. Drizzle balsamic glaze over chicken.", "Garnish with remaining fresh basil. Serve immediately."]
  },
  {
    name: "Tuna Casserole", details: "boxed deluxe Mac n' Cheese", sides: [],
    variations: ["Add frozen peas and diced celery for texture", "Top with crushed Ritz crackers and butter before baking", "Add a dash of hot sauce and smoked paprika", "Stir in a little sour cream for extra creaminess"],
    ingredients: ["boxed deluxe mac & cheese", "canned tuna (drained)", "cream of mushroom soup", "canned peas", "butter", "milk", "breadcrumbs (optional)", "salt & pepper"],
    prep: ["Preheat oven to 375°F. Cook pasta per package. Drain.", "In a large bowl, mix cooked pasta with the cheese sauce packet, butter, and milk.", "Stir in drained tuna, cream of mushroom soup, and peas.", "Pour into a greased 2-quart baking dish. Top with breadcrumbs if using.", "Bake 25–30 min until top is golden and edges are bubbling.", "Let rest 5 min before serving."]
  },
  {
    name: "Tater Tot Hotdish", details: "", sides: ["fruit"],
    variations: ["Add diced jalapeños and pepper jack cheese", "Mix in frozen corn and peas with the vegetables", "Broil the last 5 min for extra crispy tater tots", "Add a ranch seasoning packet to the meat mixture"],
    ingredients: ["ground beef", "frozen tater tots", "cream of mushroom soup", "canned mixed vegetables", "shredded cheese", "onion", "garlic", "salt & pepper", "fresh fruit"],
    prep: ["Preheat oven to 375°F. Brown ground beef with onion and garlic in a skillet. Drain fat. Season with salt and pepper.", "Stir in cream of mushroom soup and drained mixed vegetables.", "Spread mixture into a greased 9x13 baking dish.", "Arrange frozen tater tots in an even layer on top.", "Bake 45–50 min until tater tots are golden and crispy.", "Sprinkle cheese over top in last 5 min. Serve with fresh fruit."]
  },
  {
    name: "Ham Tortellini Alfredo", details: "", sides: ["garlic bread"],
    variations: ["Add frozen peas and sun-dried tomatoes", "Stir in a little cream cheese for extra richness", "Add fresh spinach right before serving — it wilts perfectly", "Finish with a squeeze of lemon and fresh parsley"],
    ingredients: ["cheese tortellini (refrigerated or frozen)", "diced ham", "heavy cream", "Parmesan cheese", "butter", "garlic", "Italian seasoning", "garlic bread", "salt & pepper", "fresh parsley (optional)"],
    prep: ["Cook tortellini per package directions. Drain and set aside.", "In the same pot, melt butter over medium heat. Add minced garlic and cook 1 min.", "Pour in heavy cream. Simmer 3–4 min until slightly thickened.", "Stir in Parmesan and Italian seasoning. Season with salt and pepper.", "Add diced ham and tortellini. Toss to coat. Cook 1–2 min to heat ham through.", "Bake or microwave garlic bread. Garnish pasta with parsley if desired."]
  },
  {
    name: "Swiss Chicken Casserole", details: "", sides: ["rice", "green beans"],
    variations: ["Add sliced mushrooms under the cheese layer", "Try with provolone or gruyere instead of Swiss", "Season chicken with garlic powder and onion powder before laying in dish", "Add a layer of stuffing mix on top for a crunchy crust"],
    ingredients: ["chicken breasts", "Swiss cheese slices", "cream of mushroom soup", "stuffing mix", "butter", "chicken broth", "garlic powder", "salt & pepper", "white rice", "green beans"],
    prep: ["Preheat oven to 350°F. Grease a 9x13 baking dish.", "Season chicken breasts with garlic powder, salt, and pepper. Place in dish.", "Lay a slice of Swiss cheese over each breast.", "Mix cream of mushroom soup with ½ cup chicken broth. Pour over chicken.", "Mix stuffing with melted butter and a bit of broth. Spread over the top.", "Cover with foil and bake 45 min. Uncover and bake 15 more min until golden. Cook rice and steam green beans to serve alongside."]
  },
  {
    name: "Manicotti Bake", details: "", sides: ["garlic bread", "salad"],
    variations: ["Mix spinach into the ricotta filling", "Add a layer of béchamel over the marinara for extra richness", "Try with a meat sauce instead of plain marinara", "Add red pepper flakes to the sauce for heat"],
    ingredients: ["manicotti shells", "ricotta cheese", "mozzarella cheese", "Parmesan", "egg", "marinara sauce", "garlic", "Italian seasoning", "garlic bread", "salad greens & dressing"],
    prep: ["Preheat oven to 350°F. Cook manicotti shells in boiling salted water until just barely al dente (2 min less than package says). Drain and cool.", "Mix ricotta, half the mozzarella, half the Parmesan, egg, garlic, and Italian seasoning.", "Spread a thin layer of marinara in a 9x13 baking dish.", "Fill each shell with ricotta mixture using a spoon or piping bag. Place in dish.", "Cover shells with remaining marinara. Top with remaining mozzarella and Parmesan.", "Cover with foil and bake 40 min. Uncover and bake 10 more min. Serve with garlic bread and salad."]
  },
  {
    name: "Super Crunch Chicken", details: "", sides: ["mashed potatoes", "vegetable"],
    variations: ["Marinate in buttermilk before coating for extra tenderness", "Add garlic powder and cayenne to the breadcrumb mix", "Try dipping in honey mustard or sriracha ranch", "Use crushed cornflakes mixed with Parmesan for the coating"],
    ingredients: ["chicken breasts", "cornflakes or panko breadcrumbs", "Parmesan", "eggs", "garlic powder", "onion powder", "paprika", "salt & pepper", "olive oil or cooking spray", "instant mashed potatoes", "vegetable of choice"],
    prep: ["Preheat oven to 400°F. Line a baking sheet with a wire rack if you have one.", "Crush cornflakes (or use panko) and mix with Parmesan, garlic powder, paprika, salt, and pepper.", "Beat eggs in a shallow dish.", "Pound chicken to even ¾-inch thickness. Dip each breast in egg, then coat thoroughly in breadcrumb mixture.", "Place on rack, spray with cooking spray or drizzle with olive oil.", "Bake 20–25 min until coating is deeply golden and internal temp is 165°F. Rest 3 min. Prepare mashed potatoes and your vegetable while chicken bakes."]
  },
  {
    name: "Spaghetti Pie", details: "", sides: ["garlic bread", "salad"],
    variations: ["Add Italian sausage to the meat sauce for more flavor", "Try with a pesto layer under the cheese on top", "Add sliced black olives and mushrooms to the sauce", "Use half spaghetti, half angel hair for a different texture"],
    ingredients: ["spaghetti", "ground beef or Italian sausage", "marinara sauce", "ricotta cheese", "mozzarella", "Parmesan", "eggs", "butter", "garlic", "Italian seasoning", "garlic bread", "salad greens & dressing"],
    prep: ["Preheat oven to 350°F. Cook spaghetti until al dente. Drain.", "Mix hot spaghetti with butter, Parmesan, and beaten eggs. Press into a greased 10-inch pie dish or springform pan to form the 'crust'.", "Spread ricotta over the spaghetti crust.", "Brown meat in a skillet. Add marinara and simmer 5 min. Spoon over ricotta layer.", "Top with mozzarella. Bake uncovered 20–25 min until bubbly and set.", "Let rest 10 min before slicing like a pie. Serve with garlic bread and salad."]
  },
  {
    name: "Marinated Pork Loin", details: "", sides: ["roasted potatoes", "vegetable"],
    variations: ["Marinate overnight in soy sauce, honey, garlic, and Dijon", "Add a rosemary-garlic butter rub under the surface", "Serve with an apple cider pan sauce", "Score the outside and stuff with garlic cloves for extra flavor"],
    ingredients: ["pork loin roast (2–3 lbs)", "olive oil", "soy sauce", "honey", "Dijon mustard", "garlic", "rosemary", "potatoes", "vegetable of choice", "salt & pepper"],
    prep: ["Mix marinade: olive oil, soy sauce, honey, Dijon, minced garlic, and rosemary. Coat pork loin and refrigerate at least 1 hour (overnight is best).", "Preheat oven to 425°F. Let pork come to room temp 20 min before cooking.", "Dice potatoes, toss with olive oil and salt. Roast on a sheet pan for 20 min.", "Sear pork in an oven-safe skillet over medium-high heat, 2–3 min per side until browned. Transfer to oven (add potatoes if pan is large enough).", "Roast 20–25 min until pork reaches 145°F internal temp. Rest 10 min before slicing.", "Prepare your vegetable while pork rests. Slice and serve."]
  },
];

const DEFAULT_LUNCHES = [
  { type: "Salad", protein: "Shredded chicken breast", base: "Caesar salad kit", extras: ["broccoli florets", "bell peppers"], variations: ["Add sunflower seeds or sliced almonds for crunch", "Try a different salad kit next week — Southwest, Asian, or Chopped", "Toss in chickpeas for extra protein and fiber", "Add sliced cucumber and cherry tomatoes for freshness"], ingredients: ["chicken breasts", "Caesar salad kit ×2", "broccoli florets", "bell peppers"], prep: ["Bake or poach chicken breasts. Shred with two forks. Season lightly with salt, pepper, and garlic powder.", "Chop broccoli and slice bell peppers.", "Portion 8 equal containers: salad kit base, chicken, broccoli, and peppers.", "Keep dressing packets separate until ready to eat.", "Will keep 4–5 days refrigerated."] },
  { type: "Salad", protein: "Grilled chicken breast", base: "Southwest salad kit", extras: ["cherry tomatoes", "cucumbers"], variations: ["Add sliced avocado or a scoop of guac", "Top with crispy tortilla strips for crunch", "Drizzle with chipotle-lime vinaigrette instead of the kit dressing", "Add black beans to make it more filling"], ingredients: ["chicken breasts", "Southwest salad kit ×2", "cherry tomatoes", "cucumbers"], prep: ["Season chicken with salt, pepper, and a little cumin. Grill or pan-sear 6–7 min per side. Slice.", "Halve cherry tomatoes, slice cucumbers.", "Portion 8 containers with salad kit greens, chicken, tomatoes, and cucumbers.", "Store dressing separately. Eat within 4–5 days."] },
  { type: "Salad", protein: "Ground turkey", base: "Asian salad kit", extras: ["shredded carrots", "cauliflower"], variations: ["Season the turkey with ginger and soy sauce while cooking", "Add edamame for extra protein", "Top with sesame seeds and sliced green onion", "Try a peanut dressing instead of the kit dressing"], ingredients: ["ground turkey", "Asian salad kit ×2", "shredded carrots", "cauliflower florets"], prep: ["Cook ground turkey in a skillet over medium heat. Season with a splash of soy sauce, garlic powder, and ginger. Break up finely. Drain and cool.", "Chop cauliflower into small florets.", "Portion 8 containers: salad kit base, turkey, carrots, cauliflower.", "Keep dressing packets separate."] },
  { type: "Salad", protein: "Ground beef", base: "Garden salad kit", extras: ["bell peppers", "broccoli florets"], variations: ["Season the beef with taco seasoning for a taco-salad twist", "Add black beans and corn for a heartier bowl", "Top with crushed Fritos or tortilla chips", "Add a drizzle of chipotle ranch"], ingredients: ["ground beef", "Garden salad kit ×2", "bell peppers", "broccoli florets"], prep: ["Cook ground beef in a skillet. Drain fat well. Season with salt, pepper, and garlic. Cool completely before portioning.", "Slice bell peppers, chop broccoli.", "Portion 8 containers: salad kit base, cooled beef, peppers, broccoli.", "Store dressing separately."] },
  { type: "Rice Bowl", protein: "Shredded chicken breast", sauce: "teriyaki sauce", extras: ["broccoli florets", "shredded carrots"], variations: ["Add a soft-boiled egg on top", "Toss in edamame and sesame seeds", "Try with cauliflower rice instead of white rice", "Add sriracha or chili garlic sauce for heat"], ingredients: ["chicken breasts", "white rice", "broccoli florets", "shredded carrots", "teriyaki sauce"], prep: ["Cook a large batch of white rice. Spread on a sheet pan to cool quickly.", "Bake or poach chicken. Shred. Toss lightly with a spoonful of teriyaki sauce.", "Steam broccoli briefly — should be tender-crisp, not mushy (they'll soften more in the fridge).", "Portion 8 containers: rice base, chicken, broccoli, shredded carrots.", "Add a drizzle of teriyaki on top or pack it separately. Reheat 2–3 min in microwave before eating."] },
  { type: "Rice Bowl", protein: "Ground beef", sauce: "soy-ginger sauce", extras: ["bell peppers", "broccoli florets"], variations: ["Add a drizzle of sesame oil right before eating", "Top with sliced green onions and sesame seeds", "Mix a spoonful of peanut butter into the sauce for a Thai twist", "Add snap peas or sliced cucumber for freshness"], ingredients: ["ground beef", "white rice", "bell peppers", "broccoli florets", "soy sauce", "ginger", "garlic", "sesame oil"], prep: ["Cook large batch of rice. Cool.", "Brown ground beef. Drain fat. Season with soy sauce, minced ginger, garlic, and a drizzle of sesame oil.", "Sauté or steam broccoli and sliced bell peppers briefly.", "Portion 8 containers: rice, beef, peppers, broccoli.", "Reheat 2–3 min in microwave."] },
  { type: "Rice Bowl", protein: "Grilled chicken breast", sauce: "garlic butter", extras: ["cauliflower", "cherry tomatoes"], variations: ["Add a squeeze of lemon juice over everything", "Top with fresh parsley or basil", "Try with a Parmesan sprinkle for an Italian-style bowl", "Swap white rice for orzo for a different feel"], ingredients: ["chicken breasts", "white rice", "cauliflower", "cherry tomatoes", "butter", "garlic", "Italian seasoning"], prep: ["Cook rice in bulk. Cool.", "Season chicken with garlic powder and Italian seasoning. Grill or pan-sear. Slice.", "Roast or steam cauliflower florets. Halve cherry tomatoes.", "Melt butter with garlic in a small pan — drizzle over portioned bowls or keep in a small container.", "Portion 8 containers: rice, chicken, cauliflower, tomatoes."] },
  { type: "Rice Bowl", protein: "Ground chicken", sauce: "salsa", extras: ["bell peppers", "shredded carrots"], variations: ["Season the chicken with cumin and chili powder for a burrito bowl", "Add black beans and corn to make it more filling", "Top with sour cream and shredded cheese", "Add diced avocado and a squeeze of lime"], ingredients: ["ground chicken", "white rice", "bell peppers", "shredded carrots", "salsa", "cumin", "chili powder", "garlic"], prep: ["Cook rice in bulk. Cool.", "Cook ground chicken in a skillet. Season with cumin, chili powder, garlic, salt. Add a spoonful of salsa and stir in.", "Sauté or roast sliced bell peppers.", "Portion 8 containers: rice, seasoned chicken, peppers, shredded carrots.", "Top with additional salsa when serving. Reheat 2–3 min."] },
];

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickOneOfType(lunches, type) {
  const pool = lunches.filter(l => l.type === type);
  if (!pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

function generateWeek(dinners, lunches) {
  const shuffled = shuffle(dinners);
  const picked = shuffled.slice(0, 6).map((d, i) => ({
    ...d,
    alt: shuffled[6 + i] || shuffled[Math.floor(Math.random() * dinners.length)],
    day: DAYS[i],
  }));
  return {
    dinners: picked,
    lunchSalad: pickOneOfType(lunches, "Salad"),
    lunchRiceBowl: pickOneOfType(lunches, "Rice Bowl"),
    chosenLunchType: null, // "Salad" | "Rice Bowl" | null means undecided
  };
}

const EMPTY_DINNER = { name: "", details: "", sides: "", variations: "", ingredients: "", prep: "" };
const EMPTY_LUNCH = { type: "Salad", protein: "", base: "", sauce: "", extras: "", variations: "", ingredients: "", prep: "" };

// ── localStorage helpers ──
const STORAGE_KEYS = { dinners: "mp_dinners", lunches: "mp_lunches", week: "mp_week" };

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return fallback;
}

function saveToStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
}

export default function MealPlanner() {
  const [dinners, setDinnersRaw] = useState(() => loadFromStorage(STORAGE_KEYS.dinners, DEFAULT_DINNERS));
  const [lunches, setLunchesRaw] = useState(() => loadFromStorage(STORAGE_KEYS.lunches, DEFAULT_LUNCHES));
  const [week, setWeekRaw] = useState(() => {
    const saved = loadFromStorage(STORAGE_KEYS.week, null);
    return saved || generateWeek(DEFAULT_DINNERS, DEFAULT_LUNCHES);
  });
  const [tab, setTab] = useState("plan");
  const [groceryView, setGroceryView] = useState("full");
  const [swapping, setSwapping] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [copied, setCopied] = useState(false);
  const [addTab, setAddTab] = useState("dinner");
  const [showAdd, setShowAdd] = useState(false);
  const [newDinner, setNewDinner] = useState(EMPTY_DINNER);
  const [newLunch, setNewLunchForm] = useState(EMPTY_LUNCH);
  const [addSuccess, setAddSuccess] = useState("");
  const [showList, setShowList] = useState(false);

  // Persist-on-change wrappers
  const setDinners = useCallback((updater) => {
    setDinnersRaw(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveToStorage(STORAGE_KEYS.dinners, next);
      return next;
    });
  }, []);

  const setLunches = useCallback((updater) => {
    setLunchesRaw(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveToStorage(STORAGE_KEYS.lunches, next);
      return next;
    });
  }, []);

  const setWeek = useCallback((updater) => {
    setWeekRaw(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveToStorage(STORAGE_KEYS.week, next);
      return next;
    });
  }, []);

  const regenerate = useCallback(() => {
    const newWeek = generateWeek(dinners, lunches);
    setWeek(newWeek);
    setSwapping(null);
    setExpanded({});
  }, [dinners, lunches, setWeek]);

  const swapWithAlt = useCallback((idx) => {
    setWeek(prev => {
      const ds = [...prev.dinners];
      const old = ds[idx];
      ds[idx] = { ...old.alt, alt: old, day: old.day };
      return { ...prev, dinners: ds };
    });
    setSwapping(null);
  }, []);

  const rerollLunch = useCallback((type) => {
    setWeek(prev => {
      const pool = lunches.filter(l => l.type === type);
      if (!pool.length) return prev;
      const current = type === "Salad" ? prev.lunchSalad : prev.lunchRiceBowl;
      let pick = pool[Math.floor(Math.random() * pool.length)];
      let tries = 0;
      while (pick.protein === current?.protein && pool.length > 1 && tries < 10) {
        pick = pool[Math.floor(Math.random() * pool.length)];
        tries++;
      }
      return type === "Salad"
        ? { ...prev, lunchSalad: pick }
        : { ...prev, lunchRiceBowl: pick };
    });
  }, [lunches]);

  const chooseLunch = useCallback((type) => {
    setWeek(prev => ({ ...prev, chosenLunchType: prev.chosenLunchType === type ? null : type }));
    setExpanded({});
  }, []);

  const toggle = (key) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  const [showPick, setShowPick] = useState(false);
  const [pickingIdx, setPickingIdx] = useState(null);
  const [pickSearch, setPickSearch] = useState("");

  const openPicker = (idx) => { setPickingIdx(idx); setPickSearch(""); setShowPick(true); };

  const manualSwap = useCallback((idx, meal) => {
    setWeek(prev => {
      const ds = [...prev.dinners];
      ds[idx] = { ...meal, alt: ds[idx].alt, day: ds[idx].day };
      return { ...prev, dinners: ds };
    });
    setShowPick(false);
    setPickingIdx(null);
  }, []);

  const [editingMeal, setEditingMeal] = useState(null); // { kind: "dinner"|"lunch", idx: number }

  const openEditDinner = (idx) => {
    const d = dinners[idx];
    setNewDinner({
      name: d.name,
      details: d.details || "",
      sides: (d.sides || []).join(", "),
      variations: (d.variations || []).join(", "),
      ingredients: (d.ingredients || []).join(", "),
      prep: (d.prep || []).join(" | "),
    });
    setEditingMeal({ kind: "dinner", idx });
    setAddTab("dinner");
    setShowList(false);
    setShowAdd(true);
  };

  const openEditLunch = (idx) => {
    const l = lunches[idx];
    setNewLunchForm({
      type: l.type || "Salad",
      protein: l.protein || "",
      base: l.base || "",
      sauce: l.sauce || "",
      extras: (l.extras || []).join(", "),
      variations: (l.variations || []).join(", "),
      ingredients: (l.ingredients || []).join(", "),
      prep: (l.prep || []).join(" | "),
    });
    setEditingMeal({ kind: "lunch", idx });
    setAddTab("lunch");
    setShowList(false);
    setShowAdd(true);
  };

  const handleSaveDinner = () => {
    if (!newDinner.name.trim()) return;
    const meal = {
      name: newDinner.name.trim(),
      details: newDinner.details.trim(),
      sides: newDinner.sides.split(",").map(s => s.trim()).filter(Boolean),
      variations: newDinner.variations.split(",").map(s => s.trim()).filter(Boolean),
      ingredients: newDinner.ingredients.split(",").map(s => s.trim()).filter(Boolean),
      prep: newDinner.prep.split("|").map(s => s.trim()).filter(Boolean),
    };
    if (editingMeal?.kind === "dinner") {
      setDinners(prev => prev.map((d, i) => i === editingMeal.idx ? meal : d));
      setAddSuccess(`"${meal.name}" updated!`);
    } else {
      setDinners(prev => [...prev, meal]);
      setAddSuccess(`"${meal.name}" added to dinners!`);
    }
    setNewDinner(EMPTY_DINNER);
    setEditingMeal(null);
    setTimeout(() => setAddSuccess(""), 3000);
  };

  const handleSaveLunch = () => {
    if (!newLunch.protein.trim()) return;
    const meal = {
      type: newLunch.type,
      protein: newLunch.protein.trim(),
      base: newLunch.base.trim(),
      sauce: newLunch.sauce.trim(),
      extras: newLunch.extras.split(",").map(s => s.trim()).filter(Boolean),
      variations: newLunch.variations.split(",").map(s => s.trim()).filter(Boolean),
      ingredients: newLunch.ingredients.split(",").map(s => s.trim()).filter(Boolean),
      prep: newLunch.prep.split("|").map(s => s.trim()).filter(Boolean),
    };
    if (editingMeal?.kind === "lunch") {
      setLunches(prev => prev.map((l, i) => i === editingMeal.idx ? meal : l));
      setAddSuccess(`Lunch "${meal.protein}" updated!`);
    } else {
      setLunches(prev => [...prev, meal]);
      setAddSuccess(`Lunch "${meal.protein}" added!`);
    }
    setNewLunchForm(EMPTY_LUNCH);
    setEditingMeal(null);
    setTimeout(() => setAddSuccess(""), 3000);
  };

  const printPlan = () => window.print();

  const handleAddDinner = handleSaveDinner;
  const handleAddLunch = handleSaveLunch;

  const removeDinner = (idx) => setDinners(prev => prev.filter((_, i) => i !== idx));
  const removeLunch = (idx) => setLunches(prev => prev.filter((_, i) => i !== idx));

  const chosenLunch = week.chosenLunchType === "Salad" ? week.lunchSalad
    : week.chosenLunchType === "Rice Bowl" ? week.lunchRiceBowl
    : null;
  const lunchForGrocery = chosenLunch || week.lunchSalad || week.lunchRiceBowl;

  const copyAll = () => {
    const lines = ["🍽️ WEEKLY MEAL PLAN\n", "━━ DINNERS ━━"];
    week.dinners.forEach(d => {
      lines.push(`${d.day}: ${d.name}${d.details ? " — " + d.details : ""}${d.sides?.length ? " (+ " + d.sides.join(", ") + ")" : ""}`);
    });
    lines.push(`\n━━ LUNCH (all week — 8 portions) ━━`);
    const l = lunchForGrocery;
    if (l) {
      lines.push(`${l.type}: ${l.protein}${l.base ? " w/ " + l.base : ""}${l.sauce ? " + " + l.sauce : ""}`);
      if (l.extras?.length) lines.push(`Add-ins: ${l.extras.join(", ")}`);
    }
    lines.push("\n━━ GROCERY LIST ━━");
    const allIng = [...new Set(week.dinners.flatMap(d => d.ingredients || []).concat(lunchForGrocery?.ingredients || []))].sort();
    allIng.forEach(i => lines.push(`  • ${i}`));
    navigator.clipboard.writeText(lines.join("\n")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const allIngredients = [...new Set(week.dinners.flatMap(d => d.ingredients || []).concat(lunchForGrocery?.ingredients || []))].sort();

  // Styles
  const inputStyle = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1.5px solid #d1d9e0", background: "#fff", fontSize: 15, color: "#1a2332", fontFamily: "inherit", outline: "none" };
  const labelStyle = { fontSize: 13, fontWeight: 600, color: "#4a5568", marginBottom: 4, display: "block" };

  const SectionHead = ({ emoji, title, sub }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a2332", whiteSpace: "nowrap" }}>{emoji} {title}</h2>
      <div style={{ flex: 1, height: 2, background: "#e8edf2", borderRadius: 1 }} />
      {sub && <span style={{ fontSize: 12, color: "#8a9ab0", whiteSpace: "nowrap" }}>{sub}</span>}
    </div>
  );

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif", minHeight: "100vh", background: "#f0f4f8", color: "#1a2332", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html,body{overflow-x:hidden;max-width:100vw}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#f0f4f8}::-webkit-scrollbar-thumb{background:#c8d4e0;border-radius:3px}
        .btn{cursor:pointer;border:none;font-family:inherit;transition:all .16s}.btn:active{transform:scale(.97)}
        .card{background:#fff;border:1.5px solid #e2e8f0;border-radius:14px;padding:16px;transition:box-shadow .18s,border-color .18s}
        .card:hover{box-shadow:0 2px 12px rgba(0,0,0,.07);border-color:#c8d4e0}
        .navbtn{background:#fff;border:1.5px solid #e2e8f0;border-radius:10px;padding:9px 18px;color:#4a5568;font-size:14px;font-weight:500;font-family:inherit;cursor:pointer;transition:all .16s}
        .navbtn:hover{border-color:#94a3b8;color:#1a2332}
        .navbtn.active{background:#2563eb;border-color:#2563eb;color:#fff;box-shadow:0 2px 8px rgba(37,99,235,.3)}
        .pill{display:inline-flex;align-items:center;background:#eff6ff;border:1px solid #bfdbfe;border-radius:20px;padding:2px 10px;font-size:12px;font-weight:600;color:#1d4ed8}
        .pill.green{background:#f0fdf4;border-color:#bbf7d0;color:#15803d}
        .pill.orange{background:#fff7ed;border-color:#fed7aa;color:#c2410c}
        .pill.gray{background:#f8fafc;border-color:#e2e8f0;color:#64748b}
        .smbtn{font-size:12px;font-weight:600;padding:5px 12px;border-radius:8px;background:#f1f5f9;border:1.5px solid #e2e8f0;color:#475569;cursor:pointer;font-family:inherit;transition:all .16s;white-space:nowrap}
        .smbtn:hover{background:#e2e8f0;color:#1a2332}
        .smbtn.blue{background:#eff6ff;border-color:#bfdbfe;color:#2563eb}
        .smbtn.blue:hover{background:#dbeafe}
        .smbtn.green{background:#f0fdf4;border-color:#bbf7d0;color:#16a34a}
        .smbtn.red{background:#fff1f2;border-color:#fecdd3;color:#e11d48}
        .smbtn.red:hover{background:#ffe4e6}
        .vbox{background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:10px;padding:12px 14px;margin-top:10px}
        .vitem{display:flex;align-items:flex-start;gap:8px;padding:4px 0;font-size:13.5px;color:#475569;line-height:1.5}
        .vitem::before{content:"→";color:#94a3b8;font-size:12px;margin-top:2px;flex-shrink:0}
        .prepstep{display:flex;gap:10px;padding:6px 0;border-bottom:1px solid #f1f5f9;font-size:13.5px;color:#334155;line-height:1.5}
        .prepstep:last-child{border-bottom:none}
        .stepnum{background:#2563eb;color:#fff;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;margin-top:1px}
        .altbox{background:#fffbeb;border:1.5px solid #fde68a;border-radius:10px;padding:10px 14px;margin-top:10px}
        .gcol{background:#fff;border:1.5px solid #e2e8f0;border-radius:12px;padding:14px}
        .gcatttl{font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:#64748b;margin-bottom:8px;padding-bottom:6px;border-bottom:2px solid #f1f5f9}
        .gitem{display:flex;align-items:flex-start;gap:10px;padding:6px 0;font-size:14px;color:#1e293b;border-bottom:1px solid #f8fafc;line-height:1.4;cursor:pointer}
        .gitem:last-child{border-bottom:none}
        .gitem.checked{color:#94a3b8;text-decoration:line-through}
        .gcheck{width:18px;height:18px;border:2px solid #cbd5e1;border-radius:4px;flex-shrink:0;display:flex;align-items:center;justify-content:center;margin-top:1px;transition:all .15s}
        .gcheck.checked{background:#2563eb;border-color:#2563eb;color:#fff}
        .modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,.45);display:flex;align-items:flex-start;justify-content:center;padding:40px 16px;z-index:100;overflow-y:auto}
        .modal{background:#fff;border-radius:18px;padding:28px;max-width:560px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.2)}
        input:focus,textarea:focus{border-color:#2563eb!important;box-shadow:0 0 0 3px rgba(37,99,235,.12)!important;outline:none}
        textarea{resize:vertical;min-height:60px}
        .toggle-row{display:flex;background:#f1f5f9;border-radius:10px;padding:4px;gap:4px}
        .toggle-opt{flex:1;padding:7px 12px;border-radius:8px;font-size:13px;font-weight:600;font-family:inherit;border:none;cursor:pointer;transition:all .16s;color:#64748b;background:transparent}
        .toggle-opt.active{background:#fff;color:#1a2332;box-shadow:0 1px 4px rgba(0,0,0,.1)}
        @media print {
          body, html { background: #fff !important; }
          #print-plan { display: block !important; max-width: 640px; margin: 0 auto; padding: 24px; font-family: Georgia, serif; color: #1a2332; line-height: 1.7; font-size: 14px; }
          #print-plan * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          #print-plan h1, #print-plan h3, #print-plan div, #print-plan p, #print-plan span { display: revert; }
          #app-ui { display: none !important; }
          .modal-overlay { display: none !important; }
          @page { margin: 1.5cm; }
        }
      `}</style>

      {/* App UI - hidden during print */}
      <div id="app-ui">
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1.5px solid #e2e8f0", padding: "18px 20px 14px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1a2332", letterSpacing: "-.02em" }}>🍽️ Weekly Meal Planner</h1>
              <p style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>Jordy · Mandy · Luke &nbsp;·&nbsp; {dinners.length} dinners · {lunches.length} lunch options in pool</p>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button className="btn" style={{ background: "#2563eb", color: "#fff", fontWeight: 700, fontSize: 14, padding: "9px 20px", borderRadius: 10, boxShadow: "0 2px 8px rgba(37,99,235,.25)", border: "none" }} onClick={regenerate}>↻ New Week</button>
              <button className="btn smbtn blue" style={{ fontSize: 13, padding: "9px 14px" }} onClick={() => setShowAdd(true)}>＋ Add Meal</button>
              <button className="btn smbtn" style={{ fontSize: 13, padding: "9px 14px" }} onClick={() => setShowList(true)}>📋 All Meals</button>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
            {[["plan", "📅 Meal Plan"], ["grocery", "🛒 Grocery List"]].map(([id, label]) => (
              <button key={id} className={`navbtn btn ${tab === id ? "active" : ""}`} onClick={() => setTab(id)}>{label}</button>
            ))}
            <button className="navbtn btn" onClick={copyAll} style={copied ? { background: "#f0fdf4", borderColor: "#86efac", color: "#16a34a" } : {}}>
              {copied ? "✓ Copied!" : "⎘ Copy Plan"}
            </button>
            <button className="navbtn btn" onClick={() => window.print()}>🖨️ Print Plan</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "24px 16px 60px" }}>

        {/* ── MEAL PLAN TAB ── */}
        {tab === "plan" && (<>
          <SectionHead emoji="🍽" title="Dinners" sub="6 nights" />
          <div style={{ display: "grid", gap: 10, marginBottom: 32 }}>
            {week.dinners.map((d, idx) => {
              const key = `d${idx}`;
              const open = expanded[key];
              const prepOpen = expanded[`prep${idx}`];
              const doSwap = swapping === idx;
              return (
                <div key={idx} className="card">
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 2 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#2563eb", textTransform: "uppercase", letterSpacing: ".07em", flexShrink: 0 }}>{d.day}</span>
                      <span style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{d.name}</span>
                    </div>
                    {d.details && <p style={{ fontSize: 14, color: "#64748b", marginTop: 2 }}>{d.details}</p>}
                    {d.sides?.length > 0 && (
                      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 6 }}>
                        {d.sides.map((s, i) => <span key={i} className="pill green">+ {s}</span>)}
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {d.prep?.length > 0 && (
                      <button className={`smbtn btn ${prepOpen ? "blue" : ""}`} onClick={() => toggle(`prep${idx}`)}>
                        📝 {prepOpen ? "Hide prep" : "Prep"}
                      </button>
                    )}
                    {d.variations?.length > 0 && (
                      <button className={`smbtn btn ${open ? "blue" : ""}`} onClick={() => toggle(key)}>
                        💡 {open ? "Hide tips" : "Tips"}
                      </button>
                    )}
                    {doSwap
                      ? <button className="smbtn btn green" onClick={() => swapWithAlt(idx)}>✓ Use alt</button>
                      : <button className="smbtn btn" onClick={() => setSwapping(doSwap ? null : idx)}>⇄ Alt</button>
                    }
                    <button className="smbtn btn blue" onClick={() => openPicker(idx)}>📋 Change</button>
                  </div>

                  {prepOpen && d.prep?.length > 0 && (
                    <div className="vbox" style={{ marginTop: 10 }}>
                      <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "#94a3b8", marginBottom: 8 }}>Preparation Steps</p>
                      {d.ingredients?.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                          {d.ingredients.map((ing, i) => <span key={i} className="pill gray" style={{ fontSize: 11 }}>{ing}</span>)}
                        </div>
                      )}
                      {d.prep.map((step, i) => (
                        <div key={i} className="prepstep">
                          <div className="stepnum">{i + 1}</div>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {open && d.variations?.length > 0 && (
                    <div className="vbox">
                      <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "#94a3b8", marginBottom: 6 }}>Ways to mix it up</p>
                      {d.variations.map((v, i) => <div key={i} className="vitem">{v}</div>)}
                    </div>
                  )}

                  {doSwap && d.alt && (
                    <div className="altbox">
                      <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "#92400e", marginBottom: 3 }}>Alternate suggestion</p>
                      <p style={{ fontSize: 15, fontWeight: 600, color: "#1a2332" }}>{d.alt.name} {d.alt.details && <span style={{ fontWeight: 400, color: "#64748b", fontSize: 14 }}>— {d.alt.details}</span>}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a2332", whiteSpace: "nowrap" }}>🥗 Lunch Options</h2>
              <div style={{ flex: 1, height: 2, background: "#e8edf2", borderRadius: 1 }} />
            </div>
            <p style={{ fontSize: 12, color: "#8a9ab0" }}>Pick one · 8 portions · Jordy & Mandy all week</p>
          </div>
          {!week.chosenLunchType && (
            <div style={{ background: "#fffbeb", border: "1.5px solid #fde68a", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: "#92400e" }}>
              👇 Review both options below and tap <strong>"Choose this one"</strong> to lock in your lunch for the week.
            </div>
          )}
          {week.chosenLunchType && (
            <div style={{ background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: "#15803d" }}>
              ✓ You chose the <strong>{week.chosenLunchType}</strong> this week. Grocery list updated. <button className="btn" style={{ marginLeft: 8, fontSize: 12, color: "#64748b", background: "none", textDecoration: "underline", fontFamily: "inherit", padding: 0, cursor: "pointer" }} onClick={() => setWeek(p => ({ ...p, chosenLunchType: null }))}>Undo</button>
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12, marginBottom: 8 }}>
            {[
              { lunch: week.lunchSalad, ltype: "Salad", colorBorder: "#bfdbfe", colorPill: "pill", rerollKey: "Salad" },
              { lunch: week.lunchRiceBowl, ltype: "Rice Bowl", colorBorder: "#bbf7d0", colorPill: "pill green", rerollKey: "Rice Bowl" },
            ].map(({ lunch: l, ltype, colorBorder, colorPill, rerollKey }) => {
              if (!l) return null;
              const chosen = week.chosenLunchType === ltype;
              const notChosen = week.chosenLunchType && !chosen;
              const prepKey = `lunchPrep_${ltype}`;
              const tipKey = `lunchTip_${ltype}`;
              return (
                <div key={ltype} className="card" style={{
                  borderColor: chosen ? (ltype === "Salad" ? "#2563eb" : "#16a34a") : notChosen ? "#e2e8f0" : colorBorder,
                  borderWidth: chosen ? 2 : 1.5,
                  opacity: notChosen ? 0.55 : 1,
                  transition: "all .2s"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span className={colorPill}>{ltype}</span>
                      {chosen && <span style={{ fontSize: 11, fontWeight: 700, color: ltype === "Salad" ? "#2563eb" : "#16a34a" }}>✓ CHOSEN</span>}
                    </div>
                    <button className="smbtn btn" onClick={() => rerollLunch(rerollKey)} title={`New ${ltype} suggestion`}>⟳</button>
                  </div>

                  <p style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>{l.protein}</p>
                  {l.base && <p style={{ fontSize: 14, color: "#475569" }}><strong>Base:</strong> {l.base}</p>}
                  {l.sauce && <p style={{ fontSize: 14, color: "#475569", marginTop: 2 }}><strong>Sauce:</strong> {l.sauce}</p>}
                  {l.extras?.length > 0 && <p style={{ fontSize: 14, color: "#475569", marginTop: 2 }}><strong>Add-ins:</strong> {l.extras.join(", ")}</p>}

                  <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
                    <button
                      className="btn"
                      onClick={() => chooseLunch(ltype)}
                      style={{
                        flex: 1,
                        padding: "8px 12px",
                        borderRadius: 8,
                        fontWeight: 700,
                        fontSize: 13,
                        fontFamily: "inherit",
                        border: "1.5px solid",
                        borderColor: chosen ? (ltype === "Salad" ? "#2563eb" : "#16a34a") : "#e2e8f0",
                        background: chosen ? (ltype === "Salad" ? "#2563eb" : "#16a34a") : "#f8fafc",
                        color: chosen ? "#fff" : "#475569",
                      }}
                    >
                      {chosen ? "✓ Chosen!" : "Choose this one"}
                    </button>
                    {l.prep?.length > 0 && (
                      <button className={`smbtn btn ${expanded[prepKey] ? "blue" : ""}`} onClick={() => toggle(prepKey)}>
                        📝 {expanded[prepKey] ? "Hide" : "Prep"}
                      </button>
                    )}
                    {l.variations?.length > 0 && (
                      <button className={`smbtn btn ${expanded[tipKey] ? "blue" : ""}`} onClick={() => toggle(tipKey)}>
                        💡 {expanded[tipKey] ? "Hide" : "Tips"}
                      </button>
                    )}
                  </div>

                  {expanded[prepKey] && l.prep?.length > 0 && (
                    <div className="vbox" style={{ marginTop: 10 }}>
                      <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "#94a3b8", marginBottom: 8 }}>Prep Instructions (8 portions)</p>
                      {l.ingredients?.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                          {l.ingredients.map((ing, i) => <span key={i} className="pill gray" style={{ fontSize: 11 }}>{ing}</span>)}
                        </div>
                      )}
                      {l.prep.map((step, i) => (
                        <div key={i} className="prepstep">
                          <div className="stepnum">{i + 1}</div>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {expanded[tipKey] && l.variations?.length > 0 && (
                    <div className="vbox" style={{ marginTop: 10 }}>
                      <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "#94a3b8", marginBottom: 6 }}>Ways to mix it up</p>
                      {l.variations.map((v, i) => <div key={i} className="vitem">{v}</div>)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", marginBottom: 8 }}>Prep all 8 portions at once — Sunday or Monday morning</p>
        </>)}

        {/* ── GROCERY TAB ── */}
        {tab === "grocery" && (<>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a2332" }}>🛒 Grocery List</h2>
            <div className="toggle-row" style={{ minWidth: 280 }}>
              <button className={`toggle-opt btn ${groceryView === "full" ? "active" : ""}`} onClick={() => setGroceryView("full")}>📋 Full Shopping List</button>
              <button className={`toggle-opt btn ${groceryView === "bymeal" ? "active" : ""}`} onClick={() => setGroceryView("bymeal")}>🍽 By Meal</button>
            </div>
          </div>

          {/* Lunch summary banner */}
          <div style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe", borderRadius: 10, padding: "10px 14px", marginBottom: 18 }}>
            <p style={{ fontSize: 14, color: "#1d4ed8" }}>
              <strong>Lunch this week{week.chosenLunchType ? ` (${week.chosenLunchType})` : " (not yet chosen — showing Salad)"}:</strong>{" "}
              {lunchForGrocery?.protein}
              {lunchForGrocery?.base ? ` w/ ${lunchForGrocery.base}` : ""}
              {lunchForGrocery?.sauce ? ` + ${lunchForGrocery.sauce}` : ""}
              {lunchForGrocery?.extras?.length ? ` · ${lunchForGrocery.extras.join(", ")}` : ""}
              <span style={{ color: "#60a5fa", fontWeight: 400 }}> (8 portions)</span>
            </p>
            {!week.chosenLunchType && <p style={{ fontSize: 12, color: "#93c5fd", marginTop: 4 }}>Go to Meal Plan → Lunch to choose Salad or Rice Bowl</p>}
          </div>

          {groceryView === "full" && (
            <FullGroceryList allIngredients={allIngredients} />
          )}

          {groceryView === "bymeal" && (
            <ByMealGroceryList week={week} lunchForGrocery={lunchForGrocery} />
          )}

          <div style={{ marginTop: 16, padding: 12, background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 13, color: "#64748b" }}>
            💡 Pantry staples like olive oil, salt, garlic, and condiments may already be stocked — review before you shop.
          </div>
        </>)}
      </div>

      {/* ── ADD MEAL MODAL ── */}
      {showAdd && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowAdd(false)}>
          <div className="modal">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>
                {editingMeal ? "✏️ Edit Meal" : "＋ Add a Meal"}
              </h2>
              <button className="btn smbtn" onClick={() => { setShowAdd(false); setEditingMeal(null); setNewDinner(EMPTY_DINNER); setNewLunchForm(EMPTY_LUNCH); }} style={{ fontSize: 16, padding: "4px 10px" }}>✕</button>
            </div>
            {addSuccess && (
              <div style={{ background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 14, color: "#15803d", fontWeight: 500 }}>✓ {addSuccess}</div>
            )}
            <div style={{ display: "flex", gap: 6, marginBottom: 20, background: "#f1f5f9", borderRadius: 10, padding: 4 }}>
              {["dinner", "lunch"].map(t => (
                <button key={t} className="btn" onClick={() => setAddTab(t)} style={{ flex: 1, padding: "8px", borderRadius: 8, fontWeight: 600, fontSize: 14, fontFamily: "inherit", background: addTab === t ? "#fff" : "transparent", color: addTab === t ? "#1a2332" : "#64748b", border: addTab === t ? "1.5px solid #e2e8f0" : "1.5px solid transparent", boxShadow: addTab === t ? "0 1px 4px rgba(0,0,0,.08)" : "none" }}>
                  {t === "dinner" ? "🍽 Dinner" : "🥗 Lunch"}
                </button>
              ))}
            </div>
            {addTab === "dinner" && (
              <div style={{ display: "grid", gap: 14 }}>
                <div><label style={labelStyle}>Meal Name *</label><input style={inputStyle} placeholder="e.g. Chicken Stir-Fry" value={newDinner.name} onChange={e => setNewDinner(p => ({ ...p, name: e.target.value }))} /></div>
                <div><label style={labelStyle}>Details / Main sides</label><input style={inputStyle} placeholder="e.g. rice, green beans" value={newDinner.details} onChange={e => setNewDinner(p => ({ ...p, details: e.target.value }))} /></div>
                <div><label style={labelStyle}>Extra sides <span style={{ color: "#94a3b8", fontWeight: 400 }}>(comma-separated)</span></label><input style={inputStyle} placeholder="e.g. garlic bread, salad" value={newDinner.sides} onChange={e => setNewDinner(p => ({ ...p, sides: e.target.value }))} /></div>
                <div><label style={labelStyle}>Ingredients <span style={{ color: "#94a3b8", fontWeight: 400 }}>(comma-separated)</span></label><input style={inputStyle} placeholder="e.g. chicken breasts, soy sauce, garlic" value={newDinner.ingredients} onChange={e => setNewDinner(p => ({ ...p, ingredients: e.target.value }))} /></div>
                <div><label style={labelStyle}>Prep steps <span style={{ color: "#94a3b8", fontWeight: 400 }}>(separate steps with a | pipe character)</span></label><textarea style={inputStyle} placeholder="e.g. Preheat oven to 400°F | Season chicken and bake 25 min | Serve over rice" value={newDinner.prep} onChange={e => setNewDinner(p => ({ ...p, prep: e.target.value }))} /></div>
                <div><label style={labelStyle}>Variation tips <span style={{ color: "#94a3b8", fontWeight: 400 }}>(comma-separated)</span></label><textarea style={inputStyle} placeholder="e.g. Try with shrimp instead, Add chili flakes for heat" value={newDinner.variations} onChange={e => setNewDinner(p => ({ ...p, variations: e.target.value }))} /></div>
                <button className="btn" onClick={handleAddDinner} style={{ background: "#2563eb", color: "#fff", fontWeight: 700, fontSize: 15, padding: "12px", borderRadius: 10, width: "100%" }}>
                  {editingMeal?.kind === "dinner" ? "Save Changes" : "Add Dinner"}
                </button>
              </div>
            )}
            {addTab === "lunch" && (
              <div style={{ display: "grid", gap: 14 }}>
                <div>
                  <label style={labelStyle}>Type</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["Salad", "Rice Bowl"].map(t => (
                      <button key={t} className="btn" onClick={() => setNewLunchForm(p => ({ ...p, type: t }))} style={{ flex: 1, padding: "9px", borderRadius: 8, fontWeight: 600, fontSize: 14, fontFamily: "inherit", background: newLunch.type === t ? "#eff6ff" : "#f1f5f9", color: newLunch.type === t ? "#2563eb" : "#64748b", border: newLunch.type === t ? "1.5px solid #bfdbfe" : "1.5px solid #e2e8f0" }}>
                        {t === "Salad" ? "🥗 Salad" : "🍚 Rice Bowl"}
                      </button>
                    ))}
                  </div>
                </div>
                <div><label style={labelStyle}>Protein *</label><input style={inputStyle} placeholder="e.g. Grilled chicken breast" value={newLunch.protein} onChange={e => setNewLunchForm(p => ({ ...p, protein: e.target.value }))} /></div>
                {newLunch.type === "Salad" && <div><label style={labelStyle}>Salad Base / Kit</label><input style={inputStyle} placeholder="e.g. Southwest salad kit" value={newLunch.base} onChange={e => setNewLunchForm(p => ({ ...p, base: e.target.value }))} /></div>}
                {newLunch.type === "Rice Bowl" && <div><label style={labelStyle}>Sauce</label><input style={inputStyle} placeholder="e.g. teriyaki sauce" value={newLunch.sauce} onChange={e => setNewLunchForm(p => ({ ...p, sauce: e.target.value }))} /></div>}
                <div><label style={labelStyle}>Add-ins <span style={{ color: "#94a3b8", fontWeight: 400 }}>(comma-separated)</span></label><input style={inputStyle} placeholder="e.g. broccoli florets, bell peppers" value={newLunch.extras} onChange={e => setNewLunchForm(p => ({ ...p, extras: e.target.value }))} /></div>
                <div><label style={labelStyle}>Ingredients <span style={{ color: "#94a3b8", fontWeight: 400 }}>(comma-separated)</span></label><input style={inputStyle} placeholder="e.g. chicken breasts, salad kit ×2" value={newLunch.ingredients} onChange={e => setNewLunchForm(p => ({ ...p, ingredients: e.target.value }))} /></div>
                <div><label style={labelStyle}>Prep steps <span style={{ color: "#94a3b8", fontWeight: 400 }}>(separate steps with | )</span></label><textarea style={inputStyle} placeholder="e.g. Cook and shred chicken | Portion into 8 containers" value={newLunch.prep} onChange={e => setNewLunchForm(p => ({ ...p, prep: e.target.value }))} /></div>
                <div><label style={labelStyle}>Variation tips <span style={{ color: "#94a3b8", fontWeight: 400 }}>(comma-separated)</span></label><textarea style={inputStyle} placeholder="e.g. Add avocado, Try a different dressing" value={newLunch.variations} onChange={e => setNewLunchForm(p => ({ ...p, variations: e.target.value }))} /></div>
                <button className="btn" onClick={handleAddLunch} style={{ background: "#2563eb", color: "#fff", fontWeight: 700, fontSize: 15, padding: "12px", borderRadius: 10, width: "100%" }}>
                  {editingMeal?.kind === "lunch" ? "Save Changes" : "Add Lunch"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── ALL MEALS MODAL ── */}
      {showList && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowList(false)}>
          <div className="modal" style={{ maxWidth: 680 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>📋 All Meals in Pool</h2>
              <button className="btn smbtn" onClick={() => setShowList(false)} style={{ fontSize: 16, padding: "4px 10px" }}>✕</button>
            </div>
            <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "#64748b", marginBottom: 8 }}>🍽 Dinners ({dinners.length})</p>
            <div style={{ display: "grid", gap: 5, maxHeight: 280, overflowY: "auto", marginBottom: 20 }}>
              {dinners.map((d, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f8fafc", borderRadius: 8, padding: "8px 12px", gap: 8 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{d.name}</span>
                    {d.details && <span style={{ fontSize: 12, color: "#94a3b8" }}> — {d.details}</span>}
                  </div>
                  <button className="btn smbtn blue" style={{ padding: "3px 8px", fontSize: 12 }} onClick={() => openEditDinner(i)}>✏️</button>
                  <button className="btn smbtn red" style={{ padding: "3px 8px", fontSize: 12 }} onClick={() => removeDinner(i)}>✕</button>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "#64748b", marginBottom: 8 }}>🥗 Lunches ({lunches.length})</p>
            <div style={{ display: "grid", gap: 5, maxHeight: 180, overflowY: "auto" }}>
              {lunches.map((l, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#f8fafc", borderRadius: 8, padding: "8px 12px", gap: 8 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span className="pill" style={{ marginRight: 6 }}>{l.type}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{l.protein}</span>
                    {l.base && <span style={{ fontSize: 12, color: "#94a3b8" }}> · {l.base}</span>}
                  </div>
                  <button className="btn smbtn blue" style={{ padding: "3px 8px", fontSize: 12 }} onClick={() => openEditLunch(i)}>✏️</button>
                  <button className="btn smbtn red" style={{ padding: "3px 8px", fontSize: 12 }} onClick={() => removeLunch(i)}>✕</button>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button className="btn smbtn blue" onClick={() => { setShowList(false); setShowAdd(true); }}>＋ Add More</button>
              <button className="btn" style={{ background: "#2563eb", color: "#fff", fontWeight: 600, fontSize: 14, padding: "9px 20px", borderRadius: 8, fontFamily: "inherit", border: "none" }} onClick={() => setShowList(false)}>Done</button>
            </div>
          </div>
        </div>
      )}

      {/* ── MEAL PICKER MODAL ── */}
      {showPick && pickingIdx !== null && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowPick(false)}>
          <div className="modal" style={{ maxWidth: 620 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <h2 style={{ fontSize: 19, fontWeight: 700, color: "#0f172a" }}>📋 Change {week.dinners[pickingIdx]?.day}'s Meal</h2>
                <p style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>Currently: <strong>{week.dinners[pickingIdx]?.name}</strong></p>
              </div>
              <button className="btn smbtn" onClick={() => setShowPick(false)} style={{ fontSize: 16, padding: "4px 10px" }}>✕</button>
            </div>

            <input
              style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 15, fontFamily: "inherit", outline: "none", marginBottom: 14, background: "#f8fafc" }}
              placeholder="🔍 Search meals..."
              value={pickSearch}
              onChange={e => setPickSearch(e.target.value)}
              autoFocus
            />

            <div style={{ maxHeight: 420, overflowY: "auto", display: "grid", gap: 6 }}>
              {dinners
                .filter(d => {
                  const q = pickSearch.toLowerCase();
                  return d.name.toLowerCase().includes(q) || (d.details || "").toLowerCase().includes(q);
                })
                .map((d, i) => {
                  const isCurrent = d.name === week.dinners[pickingIdx]?.name;
                  return (
                    <div
                      key={i}
                      onClick={() => !isCurrent && manualSwap(pickingIdx, d)}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        background: isCurrent ? "#f0fdf4" : "#f8fafc",
                        border: `1.5px solid ${isCurrent ? "#86efac" : "#e2e8f0"}`,
                        borderRadius: 10, padding: "10px 14px", cursor: isCurrent ? "default" : "pointer",
                        transition: "all .15s",
                      }}
                      onMouseEnter={e => { if (!isCurrent) e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.borderColor = "#bfdbfe"; }}
                      onMouseLeave={e => { if (!isCurrent) e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = "#e2e8f0"; }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>{d.name}</span>
                        {d.details && <span style={{ fontSize: 13, color: "#94a3b8", marginLeft: 6 }}>— {d.details}</span>}
                      </div>
                      {isCurrent
                        ? <span style={{ fontSize: 12, fontWeight: 600, color: "#16a34a", flexShrink: 0, marginLeft: 8 }}>Current</span>
                        : <span style={{ fontSize: 12, color: "#2563eb", fontWeight: 600, flexShrink: 0, marginLeft: 8 }}>Select →</span>
                      }
                    </div>
                  );
                })}
              {dinners.filter(d => d.name.toLowerCase().includes(pickSearch.toLowerCase())).length === 0 && (
                <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 14, padding: "20px 0" }}>No meals match "{pickSearch}"</p>
              )}
            </div>
          </div>
        </div>
      )}

      </div>{/* end app-ui */}

      {/* ── PRINT-ONLY SECTION (hidden on screen, visible when printing) ── */}
      <div id="print-plan" style={{ display: "none" }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, fontFamily: "Georgia, serif", marginBottom: 2 }}>🍽️ Weekly Meal Plan</h1>
        <p style={{ fontSize: 12, color: "#64748b", marginBottom: 20 }}>Jordy · Mandy · Luke</p>
        <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".09em", color: "#2563eb", marginBottom: 8, borderBottom: "2px solid #dde4ed", paddingBottom: 4 }}>Dinners</h3>
        {week.dinners.map((d, i) => (
          <div key={i} style={{ display: "flex", gap: 14, padding: "7px 0", borderBottom: "1px solid #f1f5f9" }}>
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#2563eb", width: 80, flexShrink: 0, paddingTop: 3 }}>{d.day}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{d.name}</div>
              {d.details && <div style={{ fontSize: 12, color: "#64748b" }}>{d.details}</div>}
              {d.sides?.length > 0 && <div style={{ fontSize: 12, color: "#15803d" }}>+ {d.sides.join(", ")}</div>}
            </div>
          </div>
        ))}
        {lunchForGrocery && (<>
          <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".09em", color: "#2563eb", margin: "20px 0 8px", borderBottom: "2px solid #dde4ed", paddingBottom: 4 }}>Lunch — All Week (8 portions)</h3>
          <div style={{ display: "flex", gap: 14, padding: "7px 0" }}>
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: "#059669", width: 80, flexShrink: 0, paddingTop: 3 }}>Mon–Fri</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{lunchForGrocery.protein}</div>
              {lunchForGrocery.base && <div style={{ fontSize: 12, color: "#64748b" }}>Base: {lunchForGrocery.base}</div>}
              {lunchForGrocery.sauce && <div style={{ fontSize: 12, color: "#64748b" }}>Sauce: {lunchForGrocery.sauce}</div>}
              {lunchForGrocery.extras?.length > 0 && <div style={{ fontSize: 12, color: "#64748b" }}>Add-ins: {lunchForGrocery.extras.join(", ")}</div>}
            </div>
          </div>
        </>)}
        <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".09em", color: "#2563eb", margin: "20px 0 8px", borderBottom: "2px solid #dde4ed", paddingBottom: 4 }}>Grocery List</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px 28px" }}>
          {allIngredients.map((item, i) => (
            <div key={i} style={{ fontSize: 13, padding: "3px 0", borderBottom: "1px solid #f8fafc" }}>☐ {item}</div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", paddingBottom: 32, fontSize: 12, color: "#94a3b8" }}>
        Open every Friday or Saturday · Hit "New Week" to reshuffle
      </div>
    </div>
  );
}

// ── Full grocery list with checkboxes ──
function FullGroceryList({ allIngredients }) {
  const [checked, setChecked] = useState({});
  const toggle = (item) => setChecked(prev => ({ ...prev, [item]: !prev[item] }));
  const clearAll = () => setChecked({});
  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <p style={{ fontSize: 13, color: "#64748b" }}>{allIngredients.length} items · {checkedCount} checked off</p>
        {checkedCount > 0 && <button className="btn smbtn" onClick={clearAll} style={{ fontSize: 12 }}>Clear all checks</button>}
      </div>
      <div className="gcol">
        <div className="gcatttl">All Ingredients</div>
        {allIngredients.map((item, i) => (
          <div key={i} className={`gitem ${checked[item] ? "checked" : ""}`} onClick={() => toggle(item)}>
            <div className={`gcheck ${checked[item] ? "checked" : ""}`}>
              {checked[item] && <span style={{ fontSize: 11, fontWeight: 800 }}>✓</span>}
            </div>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── By-meal grocery view ──
function ByMealGroceryList({ week, lunchForGrocery }) {
  const [openMeal, setOpenMeal] = useState(null);
  const l = lunchForGrocery;
  const meals = [
    ...week.dinners.map(d => ({ label: d.day, name: d.name, ingredients: d.ingredients || [], prep: d.prep || [], type: "dinner" })),
    l ? { label: "All Week", name: `Lunch: ${l.protein}`, ingredients: l.ingredients || [], prep: l.prep || [], type: "lunch" } : null
  ].filter(Boolean);

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {meals.map((meal, i) => {
        const isOpen = openMeal === i;
        return (
          <div key={i} className="gcol" style={{ cursor: "pointer" }} onClick={() => setOpenMeal(isOpen ? null : i)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: meal.type === "lunch" ? "#059669" : "#2563eb", textTransform: "uppercase", letterSpacing: ".07em", marginRight: 8 }}>{meal.label}</span>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>{meal.name}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, color: "#94a3b8" }}>{meal.ingredients.length} items</span>
                <span style={{ color: "#94a3b8", fontSize: 16, fontWeight: 300 }}>{isOpen ? "▲" : "▼"}</span>
              </div>
            </div>
            {isOpen && (
              <div style={{ marginTop: 12 }} onClick={e => e.stopPropagation()}>
                {meal.ingredients.length > 0 && (
                  <>
                    <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "#94a3b8", marginBottom: 6 }}>Ingredients</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
                      {meal.ingredients.map((ing, j) => (
                        <span key={j} style={{ background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 6, padding: "3px 10px", fontSize: 13, color: "#334155" }}>{ing}</span>
                      ))}
                    </div>
                  </>
                )}
                {meal.prep.length > 0 && (
                  <>
                    <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "#94a3b8", marginBottom: 6 }}>Prep Steps</p>
                    {meal.prep.map((step, j) => (
                      <div key={j} className="prepstep">
                        <div className="stepnum" style={{ background: meal.type === "lunch" ? "#059669" : "#2563eb" }}>{j + 1}</div>
                        <span style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.5 }}>{step}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
