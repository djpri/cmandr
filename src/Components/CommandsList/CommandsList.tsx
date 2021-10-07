import * as React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { auth } from "../../firebase/firebase";
import { useSelector } from "react-redux";
import { ICommand } from "../../types/types";
import { RootState } from "../../Redux/store";

function CommandManager() {
  const [commands, setCommands] = React.useState<ICommand[]>([]);
  const [user, setUser] = React.useState<String>(
    "7ID0mqlWIsX7GC9qhSFBLGpDLWv1"
  );

  const firebaseAuth = useSelector((state: RootState) => state.userAuth);

  const addData = async () => {
    const docSnap: any = await getDocs(
      collection(db, `users/${user}/commands`)
    );

    const commands = docSnap.docs.map((doc: { data: () => any }) => doc.data());
    console.log(commands);
    setCommands(commands);
  };

  React.useEffect(() => {
    addData();
  }, []);

  return (
    <>
      {commands &&
        commands.map(({ id, howTo, command, reference }, index) => (
          <div key={index}>
            <div>How to: {howTo || "none"}</div>
            <div>Command: {command || "none"}</div>
            <div>
              Reference:{" "}
              <a target="_blank" rel="noreferrer" href={reference}>
                {reference || "none"}
              </a>
            </div>
            <hr />
          </div>
        ))}
    </>
  );
}

export default CommandManager;
