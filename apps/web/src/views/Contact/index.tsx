import bgImage from "../../../assets/maryland-flag-backgrounds-landscape-gold.jpg"

export default function Contact() {
  return (
    <div>
        <div
            className="relative w-full h-48 md:h-40 flex items-center justify-center"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            >

            <h1 className="relative text-3xl md:text-4xl font-bold text-black text-center px-4">
                Department of Computer Science and Electrical Engineering
            </h1>
        </div>
        <div className="max-w-2xl mx-auto p-6 space-y-10">
            <div>
                <h1 className="text-3xl font-bold mb-4">General Contact Information</h1>

                <h2 className="text-2xl font-semibold mb-2">Address</h2>
                <address className="not-italic leading-relaxed">
                Computer Science and Electrical Engineering<br />
                University of Maryland, Baltimore County<br />
                1000 Hilltop Circle<br />
                Baltimore, MD 21250 USA
                </address>

                <h2 className="text-2xl font-semibold mt-6 mb-2">Phone</h2>
                <p>
                    <span className="font-bold">Telephone: </span>
                    <a
                        href="tel:+14104553500"
                        className="underline text-blue-600 hover:text-blue-800"
                    >
                        +1-410-455-3500
                    </a>
                </p>
                <p>
                    <span className="font-bold">Fax: </span>
                    <a
                        href="tel:+14104553969"
                        className="underline text-blue-600 hover:text-blue-800"
                    >
                        +1-410-455-3969
                    </a>
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-2">Email</h2>
                <a
                href="mailto:dept@cs.umbc.edu"
                className="underline text-blue-600 hover:text-blue-800"
                >
                dept@cs.umbc.edu
                </a>
            </div>

            <div>
                <h1 className="text-3xl font-bold mb-4">Department Information</h1>
                <p>
                    <span className="font-bold">Department Office:</span> Room 325,
                    Information Technology and Engineering Building
                </p>
                <p>
                    <span className="font-bold">Department Chair: </span>
                    <a
                        href="mailto:younis@umbc.edu"
                        className="underline text-blue-600 hover:text-blue-800"
                    >
                        Mohamed Younis - younis@umbc.edu
                    </a>
                </p>
            </div>

            <div>
                <h1 className="text-3xl font-bold mb-4">
                    Graduate and Undergraduate Information
                </h1>

                <h2 className="text-2xl font-semibold mb-2">
                    Graduate Program Directors
                </h2>
                <ul className="space-y-1">
                    <li>
                        <span className="font-bold">Computer Science: </span>
                        <a href="mailto:cmat@umbc.edu" className="underline text-blue-600">
                        Cynthia Matuszek - cmat@umbc.edu
                        </a>
                    </li>
                    <li>
                        <span className="font-bold">Computer Engineering: </span>
                        <a
                        href="mailto:naghmeh.karimi@umbc.edu"
                        className="underline text-blue-600"
                        >
                        Naghmeh Karimi - naghmeh.karimi@umbc.edu
                        </a>
                    </li>
                    <li>
                        <span className="font-bold">Data Science: </span>
                        <a href="mailto:simsek@umbc.edu" className="underline text-blue-600">
                        Ergun Simsek - simsek@umbc.edu
                        </a>
                    </li>
                    <li>
                        <span className="font-bold">Electrical Engineering: </span>
                        <a
                        href="mailto:naghmeh.karimi@umbc.edu"
                        className="underline text-blue-600"
                        >
                        Naghmeh Karimi - naghmeh.karimi@umbc.edu
                        </a>
                    </li>
                    <li>
                        <span className="font-bold">Cybersecurity: </span>
                        <a
                        href="mailto:richard.forno@umbc.edu"
                        className="underline text-blue-600"
                        >
                        Richard Forno - richard.forno@umbc.edu
                        </a>
                    </li>
                    <li>
                        <span className="font-bold">General: </span>
                        <a
                        href="mailto:gradDirector@cs.umbc.edu"
                        className="underline text-blue-600"
                        >
                        gradDirector@cs.umbc.edu
                        </a>
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6 mb-2">
                Undergraduate Program Directors
                </h2>
                <ul className="space-y-1">
                    <li>
                        <span className="font-bold">Computer Science: </span>
                        <a href="mailto:jdixon@umbc.edu" className="underline text-blue-600">
                        Jeremy Dixon - jdixon@umbc.edu
                        </a>
                    </li>
                    <li>
                        <span className="font-bold">Computer Engineering: </span>
                        <a
                        href="mailto:carter@umbc.edu"
                        className="underline text-blue-600"
                        >
                        Gary Carter - carter@umbc.edu
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  );
}
