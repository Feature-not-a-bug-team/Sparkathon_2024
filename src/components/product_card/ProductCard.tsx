import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Spinner,
} from "@nextui-org/react";
import { IProduct } from "@/types";
import EditProduct from "../EditProduct";

export default function ProductTable({
    products,
    loading,
}: {
    products: IProduct[];
    loading: boolean;
}) {
    const [page, setPage] = React.useState(1);

    const rowsPerPage = 7;

    const pages = Math.ceil(products.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return products.slice(start, end);
    }, [page, products]);
    return (
        <Table
            removeWrapper
            aria-label="Example static collection table"
            bottomContent={
                <div className="flex w-full justify-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="secondary"
                        page={page}
                        total={pages}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            }
        >
            <TableHeader>
                <TableColumn>Sr no</TableColumn>
                <TableColumn>Name</TableColumn>
                <TableColumn>Price</TableColumn>
                <TableColumn>Quantity</TableColumn>
                <TableColumn>Edit</TableColumn>
            </TableHeader>
            <TableBody
                loadingState={loading ? "loading" : "idle"}
                loadingContent={<Spinner />}
            >
                {items
                    .filter((product) => product.name.length > 0)
                    .map((product, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell>{product.code}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                                <TableCell className="  transition-all cursor-pointer text-green-400">
                                    <EditProduct product={product} />
                                </TableCell>
                            </TableRow>
                        );
                    })}
            </TableBody>
        </Table>
    );
}
