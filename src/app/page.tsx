import Dashboards from "@/components/Dashboards/Dashboards";
import {Form} from "@/components/Form/Form";
import {Modal} from "@/components/Modal/Modal";

export default function Home() {
  return (
      <div
          className="font-sans h-full p-8 pb-20 gap-16 sm:p-20 bg-blue-500">
          <Dashboards/>
      </div>
  );
}
