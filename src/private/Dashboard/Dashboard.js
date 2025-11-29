import TempletePage from '../../components/Pages/templetePage';
import NewOrderButton from '../Orders/NewOrderButton';
import CandleChart from './CandleChart';
function Dashboard() {
    return (
        <TempletePage titulo="Dashboard">
            <div className="ntm-toolbar mb-0 p-1">
               <NewOrderButton />
            </div>
            <div className=''>
                <CandleChart />
            </div>            
            <div className='row'>    
                <div className='col-6'>
                    COL 1
                </div>
                <div className='col-6'>
                    COL 2
                </div>
            </div>
        </TempletePage>
    );
}

export default Dashboard;