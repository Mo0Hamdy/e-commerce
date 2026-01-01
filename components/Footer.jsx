import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faWhatsapp,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import { faShareNodes } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <div className="bg-gray-200">
      <div className="container m-auto flex items-center flex-col md:flex-row md:justify-around md:divide-x-2 md:divide-dashed py-10">
        <div className="mail md:w-1/2 flex flex-col items-center pb-5 md:pb-0">
          <p className="text-center text-gray-600 w-full md:w-4/5">
            It will be a pleasure to receive your opinions through
          </p>
          <input
            placeholder="keep your message descriptive"
            type="text"
            className="outline-0 border border-cyan-700 w-4/5 py-1 px-3 bg-violet-300 rounded-lg mt-3 placeholder:text-sm"
          />
        </div>
        <div className="w-1/2 flex justify-center">
          <div className="contact relative grid grid-cols-2 gap-1 w-fit">
            <FontAwesomeIcon
              icon={faShareNodes}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50% , -50%)",
                backgroundColor: "#e5e7eb",
                padding: "15px",
                borderRadius: "50%",
                zIndex: "10",
                color: "gray",
              }}
            />
            <a
              href="https://www.facebook.com/share/17cGF5vxNK/"
              className="text-white origin-bottom-right rounded-tl-[50%] hover:scale-110 duration-300 w-20 h-20 flex items-center justify-center bg-[#0866FF]"
            >
              <FontAwesomeIcon
                style={{
                  fontSize: "22px",
                }}
                icon={faFacebook}
              />
            </a>
            <a
              href="https://wa.me/201152411228?text=Hello%20I%20want%20to%20ask%20about%20your%20service"
              className="text-white origin-bottom-left rounded-tr-[50%] hover:scale-110 duration-300 w-20 h-20 flex items-center justify-center bg-[#25D366]"
            >
              <FontAwesomeIcon
                style={{
                  fontSize: "22px",
                }}
                icon={faWhatsapp}
              />
            </a>

            <a
              href="https://github.com/Mo0Hamdy"
              className="text-white origin-top-left rounded-bl-[50%] hover:scale-110 duration-300 w-20 h-20 flex items-center justify-center bg-[#181717] "
            >
              <FontAwesomeIcon
                style={{
                  fontSize: "22px",
                }}
                icon={faGithub}
              />
            </a>
            <a
              href="https://www.linkedin.com/in/m0hamedhamdy?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BlkA1IIX1RJ6ndsRuGIvtiQ%3D%3D"
              className="text-white origin-top-right rounded-br-[50%] hover:scale-110 duration-300 w-20 h-20 flex items-center justify-center bg-[#0A66C2]"
            >
              <FontAwesomeIcon
                style={{
                  fontSize: "22px",
                }}
                icon={faLinkedin}
              />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center py-2 capitalize text-white bg-cyan-800">
        all right reserved &copy; <span>Mohamed Hamdy</span> 2026
      </div>
    </div>
  );
}
