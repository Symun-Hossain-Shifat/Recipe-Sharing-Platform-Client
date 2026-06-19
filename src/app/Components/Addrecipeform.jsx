"use client";

import { authClient } from "@/lib/auth-client";
import { Postrecipes } from "@/lib/PostData/recipepost";
import {
  Button,
  Select,
  Card,
  CardFooter,
  CardHeader,
  Input,
  Label,
  ListBox,
  

} from "@heroui/react";



export default function CreateRecipeForm() {

     const { data: session } = authClient.useSession();
      const user = session?.user;
   
   
  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();

    formData.append("image", imageFile);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!data.success) {
      throw new Error("Image upload failed");
    }

    return data.data.display_url;
  };





  const handleSubmit = async (e) => {
    e.preventDefault();

  
      const form = e.target;

      const imageFile = form.recipeimage.files[0];

      if (!imageFile) {
        alert("Please select an image");
        return;
      }

      const imageUrl = await uploadImageToImgBB(imageFile);
      console.log(imageUrl)
      const Data = {
        
          authorName: user?.name,
        
         authorEmail : user?.email,
        
          authorId: user?.id,

        recipeName: form.recipename.value,
        recipeImage: imageUrl,

        category : form.category.value ,
        cuisineType: form.type.value,
        difficultyLevel: form.difficulty.value,
        preparationTime: form.preparation.value,
        ingredients: form.ingrediants.value,
        instructions: form.steps.value,
         likesCount : 0 ,
        isFeatured: form.featured.value,
        status : form.status.value
      };

      console.log(Data);

      const result = await Postrecipes(Data);

      console.log(result);

  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-emerald-50 flex items-center justify-center px-4 py-10">
     <form className=" w-full   " onSubmit={handleSubmit}>
      <Card className=" w-full md:w-10/12 mx-auto   shadow-2xl rounded-2xl border border-gray-100 p-6 md:p-10 space-y-8">

        {/* HEADER */}
        <CardHeader className="flex flex-col text-center space-y-2 p-0">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            🍽️ Create Your Recipe
          </h1>
          <p className="text-gray-500 text-sm">
            Share your delicious recipe with the world
          </p>
        </CardHeader>

        <div className="space-y-8 p-0">

          {/* GRID 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <Input label="Recipe Name" required type="text" name="recipename" placeholder="e.g. Vegetable Fried Rice" />

            <Input
          label="Recipe Image" required
          type="file"
          name="recipeimage"
          accept="image/*"
        />
            {/* CATEGORY */}
            <Select className="w-full" required name="category" placeholder="Select category">
              <Label>Category</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="breakfast">Breakfast</ListBox.Item>
                  <ListBox.Item id="lunch">Lunch</ListBox.Item>
                  <ListBox.Item id="dinner">Dinner</ListBox.Item>
                  <ListBox.Item id="snack">Snack</ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            <Input label="Cuisine Type" required name="type" placeholder="e.g. Chinese, Indian" />

            {/* DIFFICULTY */}
            <Select className="w-full" required name="difficulty" placeholder="Select difficulty">
              <Label>Difficulty Level</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="easy">Easy</ListBox.Item>
                  <ListBox.Item id="medium">Medium</ListBox.Item>
                  <ListBox.Item id="hard">Hard</ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            <Input
              label="Preparation Time (minutes)" required
              name="preparation"
              placeholder="e.g. 30"
              type="number"
            />
          </div>

        <div>
            <label className="block mb-2 font-medium">
                Ingredients
            </label>

            <textarea
            name="ingrediants" required
                placeholder="e.g. Rice, Vegetables, Soy sauce..."
                rows={3}
                className="w-full border rounded-xl p-3"
            />
            </div>

            <div>
            <label className="block mb-2 font-medium">
                Cooking Instructions
            </label>

            <textarea
            name="steps" required
                placeholder="Write step by step cooking guide..."
                rows={5}
                className="w-full border rounded-xl p-3"
            />
            </div>
             
            
         

          {/* GRID 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

           

            {/* FEATURED */}
            <Select name="featured" required  className="w-full" placeholder="Select">
              <Label>Featured Recipe</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="true">Yes</ListBox.Item>
                  <ListBox.Item id="false">No</ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            {/* STATUS */}
            <Select name="status"  required className="w-full" placeholder="Select status">
              <Label>Status</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="published">Published</ListBox.Item>
                  <ListBox.Item id="draft">Draft</ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

        </div>

        {/* BUTTONS */}
        <CardFooter  className="flex flex-col md:flex-row gap-4 pt-4 p-0">

          <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-emerald-500 text-white font-semibold py-3 rounded-xl">
            Submit Recipe
          </Button>

        
        </CardFooter>

      </Card>
     </form>
     
    </div>
  );
}