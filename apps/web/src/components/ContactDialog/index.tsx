import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } 
  from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { Mail, Phone, MapPin, CircleUserRound } from "lucide-react";

export function ContactDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="space-x-1 bg-transparent">
          <CircleUserRound size={16} />
          <span>Contact Us</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Department of Computer Science and Electrical Engineering
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">

          <section>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <MapPin size={18} />
              General Contact Information
            </h2>

            <p className="mt-2 leading-relaxed">
              Computer Science and Electrical Engineering<br />
              University of Maryland, Baltimore County<br />
              1000 Hilltop Circle<br />
              Baltimore, MD 21250 USA
            </p>

            <p className="mt-4 flex items-center gap-2">
              <Phone size={16} className="text-gray-600" />
              <span className="font-semibold">Telephone: </span>
              <a href="tel:+14104553500" className="underline text-blue-600">
                +1-410-455-3500
              </a>
            </p>

            <p className="flex items-center gap-2">
              <Phone size={16} className="text-gray-600" />
              <span className="font-semibold">Fax: </span>
              <a href="tel:+14104553969" className="underline text-blue-600">
                +1-410-455-3969
              </a>
            </p>

            <p className="mt-4 flex items-center gap-2">
              <Mail size={16} className="text-gray-600" />
              <a href="mailto:dept@cs.umbc.edu" className="underline text-blue-600">
                dept@cs.umbc.edu
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Department Information</h2>

            <p className="mt-2">
              <span className="font-bold">Department Office: </span> Room 325,
              Information Technology and Engineering Building
            </p>

            <p className="mt-2">
              <span className="font-bold">Department Chair: </span>
              <a
                href="mailto:younis@umbc.edu"
                className="underline text-blue-600"
              >
                Mohamed Younis - younis@umbc.edu
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Graduate Program Directors</h2>

            <ul className="mt-2 space-y-1">
              <li>
                <span className="font-bold">Computer Science: </span>
                <a href="mailto:cmat@umbc.edu" className="underline text-blue-600">
                  Cynthia Matuszek - cmat@umbc.edu
                </a>
              </li>

              <li>
                <span className="font-bold">Computer Engineering: </span>
                <a href="mailto:naghmeh.karimi@umbc.edu" className="underline text-blue-600">
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
                <a href="mailto:naghmeh.karimi@umbc.edu" className="underline text-blue-600">
                  Naghmeh Karimi - naghmeh.karimi@umbc.edu
                </a>
              </li>

              <li>
                <span className="font-bold">Cybersecurity: </span>
                <a href="mailto:richard.forno@umbc.edu" className="underline text-blue-600">
                  Richard Forno - richard.forno@umbc.edu
                </a>
              </li>

              <li>
                <span className="font-bold">General: </span>
                <a href="mailto:gradDirector@cs.umbc.edu" className="underline text-blue-600">
                  gradDirector@cs.umbc.edu
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Undergraduate Program Directors</h2>

            <ul className="mt-2 space-y-1">
              <li>
                <span className="font-bold">Computer Science: </span>
                <a href="mailto:jdixon@umbc.edu" className="underline text-blue-600">
                  Jeremy Dixon - jdixon@umbc.edu
                </a>
              </li>

              <li>
                <span className="font-bold">Computer Engineering: </span>
                <a href="mailto:carter@umbc.edu" className="underline text-blue-600">
                  Gary Carter - carter@umbc.edu
                </a>
              </li>
            </ul>
          </section>

        </div>
      </DialogContent>
    </Dialog>
  );
}
