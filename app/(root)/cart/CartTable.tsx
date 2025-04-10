// "use client";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { AddItemToCart, removeItemFromCart } from "@/lib/actions/cartActions";
// import { formatCurrency } from "@/lib/utils";
// import { Cart } from "@/types";
// import { ArrowRight, Loader, Minus, Plus, XCircle } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { useTransition } from "react";
// import { toast } from "sonner";

// type Props = {
//   cart?: Cart;
// };

// function CartTable({ cart }: Props) {
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();
//   const [isPending2, startTransition2] = useTransition();
//   const [isPending3, startTransition3] = useTransition();
//   return (
//     <>
//       <h1 className="py-4 h2-bold">Shopping Cart</h1>
//       {!cart || cart.items.length === 0 ? (
//         <div className="flex space-x-2 items-center">
//           <div>Cart is empty.</div>
//           <Button asChild size="sm" variant="destructive" className="text-sm">
//             <Link href="/">Go shopping</Link>
//           </Button>
//         </div>
//       ) : (
//         <div className="grid md:grid-cols-4 md:gap-5">
//           <div className="overflow-x-auto md:col-span-3">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Item</TableHead>
//                   <TableHead className="text-center">Quantity</TableHead>
//                   <TableHead className="text-center">Price</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {cart.items?.map((item) => (
//                   <TableRow key={item.slug}>
//                     <TableCell>
//                       <Link
//                         href={`/product/${item.slug}`}
//                         className="flex items-center"
//                       >
//                         <Image
//                           src={item.image}
//                           alt={item.name}
//                           width={50}
//                           height={50}
//                         />
//                         <span className="px-2">{item.name}</span>
//                       </Link>
//                     </TableCell>
//                     <TableCell className="flex-center gap-2">
//                       <Button
//                         disabled={isPending}
//                         variant="outline"
//                         type="button"
//                         onClick={() =>
//                           startTransition(async () => {
//                             const res = await removeItemFromCart(
//                               item.productId
//                             );
//                             if (!res.success) {
//                               toast.error(res.message, {
//                                 icon: (
//                                   <XCircle className="text-red-500 size-4" />
//                                 ),
//                                 style: {
//                                   backgroundColor: "#fee2e2",
//                                   color: "#991b1b",
//                                   border: "1px solid #fca5a5",
//                                 },
//                               });
//                             }
//                           })
//                         }
//                       >
//                         {isPending ? (
//                           <Loader className="w-4 h-4  animate-spin" />
//                         ) : (
//                           <Minus className="w-4 h-4" />
//                         )}
//                       </Button>
//                       <span>{item.qty}</span>
//                       <Button
//                         disabled={isPending}
//                         variant="outline"
//                         type="button"
//                         onClick={() =>
//                           startTransition2(async () => {
//                             const res = await AddItemToCart(item);
//                             if (!res.success) {
//                               toast.error(res.message, {
//                                 icon: (
//                                   <XCircle className="text-red-500 size-4" />
//                                 ),
//                                 style: {
//                                   backgroundColor: "#fee2e2",
//                                   color: "#991b1b",
//                                   border: "1px solid #fca5a5",
//                                 },
//                               });
//                             }
//                           })
//                         }
//                       >
//                         {isPending2 ? (
//                           <Loader className="w-4 h-4  animate-spin" />
//                         ) : (
//                           <Plus className="w-4 h-4" />
//                         )}
//                       </Button>
//                     </TableCell>
//                     <TableCell className="text-center">{item.price}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//           <Card>
//             <CardContent className="p-4 gap-4 ">
//               <div className="pb-3 text-xl ">
//                 Subtotal ({cart.items.reduce((a, c) => a + c.qty, 0)}):
//                 <span className="font-bold">
//                   {formatCurrency(cart.itemsPrice)}
//                 </span>
//                 <Button
//                   className="w-full mt-2"
//                   disabled={isPending3}
//                   onClick={() =>
//                     startTransition3(() => router.push("/shipping-address"))
//                   }
//                 >
//                   {isPending3 ? (
//                     <Loader className="animate-spin w-4 h-4" />
//                   ) : (
//                     <ArrowRight className="w-4 h-4" />
//                   )}
//                   Proceed to Checkout
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </>
//   );
// }

// export default CartTable;

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddItemToCart, removeItemFromCart } from "@/lib/actions/cartActions";
import { formatCurrency } from "@/lib/utils";
import { Cart } from "@/types";
import { ArrowRight, Loader, Minus, Plus, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

type Props = {
  cart?: Cart;
};

function CartTable({ cart }: Props) {
  const router = useRouter();

  const [addingItemId, setAddingItemId] = useState<string | null>(null);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);
  const [isCheckingOut, startCheckoutTransition] = useTransition();

  return (
    <>
      <h1 className="py-4 h2-bold">Shopping Cart</h1>

      {!cart || cart.items.length === 0 ? (
        <div className="flex space-x-2 items-center">
          <div>Cart is empty.</div>
          <Button asChild size="sm" variant="destructive" className="text-sm">
            <Link href="/">Go shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-center">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items?.map((item) => (
                  <TableRow key={item.slug}>
                    <TableCell>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        <span className="px-2">{item.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="flex-center gap-2">
                      <Button
                        disabled={removingItemId === item.productId}
                        variant="outline"
                        type="button"
                        onClick={async () => {
                          setRemovingItemId(item.productId);
                          const res = await removeItemFromCart(item.productId);
                          setRemovingItemId(null);
                          if (!res.success) {
                            toast.error(res.message, {
                              icon: <XCircle className="text-red-500 size-4" />,
                              style: {
                                backgroundColor: "#fee2e2",
                                color: "#991b1b",
                                border: "1px solid #fca5a5",
                              },
                            });
                          }
                        }}
                      >
                        {removingItemId === item.productId ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <Minus className="w-4 h-4" />
                        )}
                      </Button>

                      <span>{item.qty}</span>

                      <Button
                        disabled={addingItemId === item.productId}
                        variant="outline"
                        type="button"
                        onClick={async () => {
                          setAddingItemId(item.productId);
                          const res = await AddItemToCart(item);
                          setAddingItemId(null);
                          if (!res.success) {
                            toast.error(res.message, {
                              icon: <XCircle className="text-red-500 size-4" />,
                              style: {
                                backgroundColor: "#fee2e2",
                                color: "#991b1b",
                                border: "1px solid #fca5a5",
                              },
                            });
                          }
                        }}
                      >
                        {addingItemId === item.productId ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-center">
                      {formatCurrency(item.price)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Card>
            <CardContent className="p-4 gap-4">
              <div className="pb-3 text-xl">
                Subtotal ({cart.items.reduce((a, c) => a + c.qty, 0)}):{" "}
                <span className="font-bold">
                  {formatCurrency(cart.itemsPrice)}
                </span>
              </div>
              <Button
                className="w-full mt-2"
                disabled={isCheckingOut}
                onClick={() =>
                  startCheckoutTransition(() =>
                    router.push("/shipping-address")
                  )
                }
              >
                {isCheckingOut ? (
                  <Loader className="animate-spin w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

export default CartTable;
