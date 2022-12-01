import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';
import User from '../../../models/User';


const ProductDetails: NextPage = (props: any) => {


    return (
        <AdminLayout>
            <>
                <div className="card bg-white text-primary rounded-lg">
                    <div className="card-body flex flex-row p-4">

                        <div className="img-wrapper w-32 h-32 flex justify-center items-center rounded-lg overflow-hidden">
                            <Image width={100} height={100} className="object-cover h-full" src="https://source.unsplash.com/random/?bill" alt="img title" />
                        </div>
                        <div className="py-2 ml-10">
                            <h1 className="h6 text-6xl">{props.product.name}</h1>

                            <ul className="mt-2">
                                <li><strong>Id</strong>: {props.product._id}</li>
                                <li><strong>Admin</strong>: {props.product.name}</li>
                            </ul>
                        </div>

                    </div>
                </div>
                {/* <div className="p-5 rounded-lg bg-white mt-5">
                    <div className="card col-span-2 xl:col-span-1">
                        <div className="card-header my-5">product members</div>

                        <table className="table-auto w-full text-left">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-r">Id</th>
                                    <th className="px-4 py-2 border-r">Username</th>
                                    <th className="px-4 py-2 border-r">Email</th>
                                    <th className="px-4 py-2 border-r">Bio</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600">
                                {props.product.members.map((member: any) => (
                                    <tr key={member._id}>
                                        <td className="border border-l-0 px-4 py-2 ">
                                            <a className='text-blue-800 hover:underline' href={`/admin/user/${ member._id }`}>{ member._id }</a>
                                        </td>
                                        <td className="border border-l-0 px-4 py-2">{ member.username }</td>
                                        <td className="border border-l-0 px-4 py-2">{ member.email }</td>
                                        <td className="border border-l-0 px-4 py-2">{ member.bio }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div> */}

            </>
        </AdminLayout>
    );
}

export async function getServerSideProps(context: any) {
    await dbConnect();
    const product = await Product.findById(context.query.id);
    return {
        props: {
            product: JSON.parse(JSON.stringify(product))
        },
    }
}

export default ProductDetails
