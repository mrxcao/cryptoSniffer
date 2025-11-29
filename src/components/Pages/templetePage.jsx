import Navbar from '../Menu/NavBar';
import SideBar from '../Menu/SideBar';
import Footer from './Footer';
export default function TempletePage({children, titulo}){
    return (
        <>
            <Navbar />
            <SideBar />
            <main className="content ">
                <div className="card card-body border-0 shadow mb-4">
                    <h5>{titulo}</h5>                
                    {children}
                </div>
                <Footer />
            </main>
        </>
    );
}