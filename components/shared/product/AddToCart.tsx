// "use client";
// import { Button } from "@/components/ui/button";
// import { AddItemToCart, removeItemFromCart } from "@/lib/actions/cartActions";
// import { Cart, CartItem } from "@/types";
// import { CheckCircle, Minus, Plus, XCircle } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// type Props = {
//   item: CartItem;
//   cart?: Cart;
// };

// function AddToCart({ item, cart }: Props) {
//   const router = useRouter();

//   const handleAddToCart = async () => {
//     const res = await AddItemToCart(item);
//     if (!res.success) {
//       toast(`${item.name} could not be added to cart`, {
//         icon: <XCircle className="text-red-500 size-4" />,
//         style: {
//           backgroundColor: "#fee2e2", // light red
//           color: "#991b1b", // dark red text
//           border: "1px solid #fca5a5",
//         },
//       });
//       return;
//     }
//     toast.success(res.message, {
//       icon: <CheckCircle className="text-green-500 size-4" />,
//       style: {
//         backgroundColor: "#dcfce7", // light green
//         color: "#166534", // dark green text
//         border: "1px solid #86efac",
//       },
//       action: {
//         label: "Go To Cart",
//         onClick: () => router.push("/cart"),
//       },
//     });
//   };

//   // Remove item from cart
//   const handleRemoveFromCart = async () => {
//     const res = await removeItemFromCart(item.productId);

//     if (!res.success) {
//       toast.error(res.message, {
//         icon: <XCircle className="text-red-500 size-4" />,
//         style: {
//           backgroundColor: "#fee2e2", // light red
//           color: "#991b1b", // dark red text
//           border: "1px solid #fca5a5",
//         },
//       });
//       return;
//     }
//     toast.success(res.message, {
//       icon: <CheckCircle className="text-green-500 size-4" />,
//       style: {
//         backgroundColor: "#dcfce7", // light green
//         color: "#166534", // dark green text
//         border: "1px solid #86efac",
//       },
//       action: {
//         label: "Go To Cart",
//         onClick: () => router.push("/cart"),
//       },
//     });

//     return;
//   };

//   // check if item is in cart
//   const existItem =
//     cart && cart.items.find((x) => x.productId === item.productId);

//   return (
//     <>
//       {existItem ? (
//         <div>
//           <Button
//             type="button"
//             variant="outline"
//             onClick={handleRemoveFromCart}
//           >
//             <Minus className="w-4 h-4" />
//           </Button>
//           <span className="px-2">{existItem?.qty}</span>
//           <Button type="button" variant="outline" onClick={handleAddToCart}>
//             <Plus className="w-4 h-4" />
//           </Button>
//         </div>
//       ) : (
//         <Button className="w-full" type="button" onClick={handleAddToCart}>
//           <Plus className="w-4 h-4" />
//           Add to cart
//         </Button>
//       )}
//     </>
//   );
// }

// export default AddToCart;

"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddItemToCart, removeItemFromCart } from "@/lib/actions/cartActions";
import { Cart, CartItem } from "@/types";
import { CheckCircle, Loader, Minus, Plus, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  item: CartItem;
  cart?: Cart;
};

function AddToCart({ item, cart }: Props) {
  const router = useRouter();

  const [addLoading, setAddLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [addNewLoading, setAddNewLoading] = useState(false);

  const handleAddToCart = async () => {
    setAddLoading(true);
    const res = await AddItemToCart(item);
    setAddLoading(false);

    if (!res.success) {
      toast.error(res.message, {
        icon: <XCircle className="text-red-500 size-4" />,
        style: {
          backgroundColor: "#fee2e2",
          color: "#991b1b",
          border: "1px solid #fca5a5",
        },
      });
      return;
    }

    toast.success(res.message, {
      icon: <CheckCircle className="text-green-500 size-4" />,
      style: {
        backgroundColor: "#dcfce7",
        color: "#166534",
        border: "1px solid #86efac",
      },
      action: {
        label: "Go To Cart",
        onClick: () => router.push("/cart"),
      },
    });
  };

  const handleRemoveFromCart = async () => {
    setRemoveLoading(true);
    const res = await removeItemFromCart(item.productId);
    setRemoveLoading(false);

    if (!res.success) {
      toast.error(res.message, {
        icon: <XCircle className="text-red-500 size-4" />,
        style: {
          backgroundColor: "#fee2e2",
          color: "#991b1b",
          border: "1px solid #fca5a5",
        },
      });
      return;
    }

    toast.success(res.message, {
      icon: <CheckCircle className="text-green-500 size-4" />,
      style: {
        backgroundColor: "#dcfce7",
        color: "#166534",
        border: "1px solid #86efac",
      },
      action: {
        label: "Go To Cart",
        onClick: () => router.push("/cart"),
      },
    });
  };

  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return (
    <>
      {existItem ? (
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleRemoveFromCart}
            disabled={removeLoading}
          >
            {removeLoading ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Minus className="w-4 h-4" />
            )}
          </Button>

          <span className="px-2">{existItem.qty}</span>

          <Button
            type="button"
            variant="outline"
            onClick={handleAddToCart}
            disabled={addLoading}
          >
            {addLoading ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </Button>
        </div>
      ) : (
        <Button
          className="w-full"
          type="button"
          onClick={async () => {
            setAddNewLoading(true);
            await handleAddToCart();
            setAddNewLoading(false);
          }}
          disabled={addNewLoading}
        >
          {addNewLoading ? (
            <Loader className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Plus className="w-4 h-4 mr-2" />
          )}
          Add to cart
        </Button>
      )}
    </>
  );
}

export default AddToCart;
