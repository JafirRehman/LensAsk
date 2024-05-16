import { MdDeleteSweep } from "react-icons/md"
import { useDispatch } from "react-redux";
import { removefromcartThunk } from '../redux/Slices/UserSlice';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const CartItem = ({ item }) => {

    const userState = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const removefromCart = (productId) => {
        if (userState.user) {
            dispatch(removefromcartThunk(productId));
        } else {
            toast.error("Please login to remove items from cart");
            navigate("/login");
        }
    }

    return (

        <div className="p-4 border-b-2 last:border-none border-slate-700">
            <div className="flex justify-between py-3.5 px-2.5 gap-14 flex-col md:flex-row">
                <div className="md:w-[30%] w-full flex justify-center items-center">
                    <img src={item.image} alt="" className="w-[40%] max-h-[200px] md:w-[50%] lg:w-full" />
                </div>
                <div className="md:w-[70%] w-full flex flex-col gap-5">
                    <h1 className="text-xl font-[600] text-slate-700">{item.title}</h1>
                    <h1 className="text-slate-700">{
                        item.description.split(" ").slice(0, 15).join(" ") + "..."}
                    </h1>
                    <div className="flex justify-between">
                        <p className="font-bold text-[#16a34a] text-lg">${item.price}</p>
                        <div
                            onClick={() => { removefromCart(item._id) }}
                            className="w-10 h-10 rounded-full bg-red-200 flex justify-center items-center hover:bg-red-400 group transition-all">
                            <MdDeleteSweep className="text-ourred-800 transition-all" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CartItem;
