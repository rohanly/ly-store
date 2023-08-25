import React, { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useProducts } from "@/context/ProductContext";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DISALLOW_CHAR = [
  "-",
  "_",
  ".",
  "+",
  "ArrowUp",
  "ArrowDown",
  "Unidentified",
  "e",
  "E",
];

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantityInStock: "",
    category: "",
  });
  const [isValid, setIsValid] = useState(false);

  const [file, setFile] = useState("");
  const { refetch: refetchProducts } = useProducts();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSelect = (selected) => {
    setProduct({ ...product, category: selected });
  };

  useEffect(() => {
    if (
      product &&
      product.name &&
      product.price &&
      product.quantityInStock &&
      product.category
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("productImage", product.productImage);
    formData.append("price", product.price);
    formData.append("quantityInStock", product.quantityInStock);
    formData.append("category", product.category);
    formData.append("productImage", file);

    const res = await axios.post(`/api/admin/addProduct`, formData);

    if (res.status === 200) {
      console.log("product uploaded successfully!!");
      setProduct({
        name: "",
        productImage: "",
        price: "",
        quantityInStock: "",
        category: "",
      });
      refetchProducts();
    } else {
      console.log("unsuccessful!!");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          <span>Add Product</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
            <DialogDescription>Add Products Details Here</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={product.name}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select
                id="category"
                name="category"
                onValueChange={handleSelect}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Wafers">Wafers</SelectItem>
                  <SelectItem value="Chocolates And Biscuits">
                    Chocolates And Biscuits
                  </SelectItem>
                  <SelectItem value="Mind Refresh">Mind Refresh</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="product_img" className="text-right">
                Image
              </Label>
              <Input
                id="prd_img"
                name="productImage"
                required
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                name="quantityInStock"
                required
                type="number"
                value={product.quantityInStock}
                onChange={handleChange}
                className="col-span-3"
                onKeyDown={(e) => {
                  //capturing ctrl V and ctrl C
                  (e.key == "v" && (e.metaKey || e.ctrlKey)) ||
                  DISALLOW_CHAR.includes(e.key) ||
                  e.key === "ArrowUp" ||
                  e.key === "ArrowDown"
                    ? e.preventDefault()
                    : null;
                }}
                min="1"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                name="price"
                required
                type="number"
                min="1"
                onKeyDown={(e) => {
                  //capturing ctrl V and ctrl C
                  (e.key == "v" && (e.metaKey || e.ctrlKey)) ||
                  DISALLOW_CHAR.includes(e.key) ||
                  e.key === "ArrowUp" ||
                  e.key === "ArrowDown"
                    ? e.preventDefault()
                    : null;
                }}
                value={product.price}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose
              disabled={!isValid}
              className={cn(buttonVariants())}
              type="submit"
            >
              Save changes
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProduct;
