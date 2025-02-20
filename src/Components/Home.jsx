
import { useContext } from 'react';
import task from '../assets/task.jpeg'
import { AuthContext } from './AuthProvider/AuthProvider';
import { Link } from 'react-router';



const Home = () => {

    const {user} = useContext(AuthContext);


    return (
        <div>

            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src={task}
                        className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">Welcome To Task Management!!!</h1>
                        <p className="py-6">
                        Task management is the process of organizing, tracking, and prioritizing tasks to ensure timely completion and efficient workflow. It involves setting clear goals, assigning responsibilities, and creating a structured plan to accomplish tasks. Effective task management enables individuals and teams to stay organized, minimize stress, and maintain focus on important objectives. It often includes setting deadlines, breaking larger tasks into smaller, manageable steps, and using tools like to-do lists, task boards, or project management software. In collaborative environments, task management enhances communication and accountability, ensuring that everyone is on the same page. Proper task management can boost productivity, improve decision-making, and lead to better results overall.
                        </p>
                        {
                            user? (<Link to='/task'><button className="btn btn-outline btn-info">Manage Task</button></Link>)
                            :
                            (<Link to='/login'><button className="btn btn-outline btn-info">Manage Task</button></Link>)
                        }
                    </div>
                </div>
            </div>







        </div>
    );
};

export default Home;