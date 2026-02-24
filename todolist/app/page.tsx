import './globals.css';
export default function Home() {
  return (
      <div className={"bg-yellow-50 flex flex-col items-center justify-center min-h-screen"}>
          <h1 className={"text-5xl font-bold text-gray-800 mt-10 text-center"}>Bienvenue sur votre application de liste
              de tâches !</h1>
          <nav className={"flex flex"}>
              <ul className={"flex items-center justify-center gap-6 mt-10"}>
                  <li className={"bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded transition text-5xl"}>
                      <a href="/todo" className="text-blue-500 hover:underline">
                          Aller à la liste de tâches
                      </a>
                  </li>
              </ul>
          </nav>
      </div>
  );
}
