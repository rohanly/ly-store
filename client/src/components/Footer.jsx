import ctaImage from "@/assets/images/cta_three.webp";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { gsap, ScrollTrigger } from "gsap/all";
import { cn } from "@/lib/utils";
import FooterBushesImage from "@/assets/images/footer-bushes.svg";
import FooterBushesMobileImage from "@/assets/images/footer-bushes-mobile.svg";

const Footer = ({ className }) => {
  return (
    <>
      <picture id="footer-bushes">
        <source media="(min-width:650px)" srcSet={FooterBushesImage} />
        <img
          src={FooterBushesMobileImage}
          alt="footer-bushes"
          className="w-full"
          width="400"
          height="200"
        />
      </picture>
      <footer className={cn("p-4 bg-[#1f4c48]", className)}>
        <FooterNav />
      </footer>
    </>
  );
};

export default Footer;

function FooterCTA() {
  const [open, setOpen] = useState(false);
  const [triviaChecked, setTriviaChecked] = useState(false);

  const create = (options) => {
    return gsap.utils.createLottie(options);
  };

  const cloudAnimationTimeline = gsap.timeline();
  cloudAnimationTimeline
    .add(gsap.to("#cloud2", { translateX: "120px" }))
    .add(gsap.to("#cloud3", { translateX: "-100px" }))
    .add(gsap.to("#cloud1", { translateX: "100px" }));

  const flowerAnimationTimeline = gsap.timeline({
    transformOrigin: "center bottom",
    repeat: -1,
    yoyo: true,
  });
  gsap.fromTo(
    ".flower-container",
    { translateY: "+=100%" },
    {
      translateY: `-=100%`,
      ease: "none",
      scrollTrigger: {
        trigger: ".flower-container",
        start: () => "top bottom-=20%",
        end: "+=20%",
        scrub: true,
        invalidateOnRefresh: true,
      },
    }
  );
  flowerAnimationTimeline
    .add(gsap.to("#flower1", { rotation: "-=20" }))
    .add(gsap.to("#flower2", { rotation: "+=20" }))
    .add(gsap.to("#flower3", { rotation: "-=20" }))
    .add(gsap.to("#flower4", { rotation: "+=10" }))
    .add(gsap.to("#flower5", { rotation: "-=20" }))
    .add(gsap.to("#flower6", { rotation: "+=8" }));

  const footerTimeline = gsap.timeline();
  footerTimeline.add(cloudAnimationTimeline).add(flowerAnimationTimeline);

  return (
    <footer className="bg-[#1f4c48]">
      <div className="clouds">
        <div id="cloud1"></div>
        <div id="cloud2"></div>
        <div id="cloud3"></div>
      </div>
      <div className="flower-container">
        <div id="flower1"></div>
        <div id="flower2"></div>
        <div id="flower3"></div>
        <div id="flower4"></div>
        <div id="flower5"></div>
        <div id="flower6"></div>
      </div>
      <div className="footer-links">
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="#">Privacy Policy</a>
      </div>
      <div className="trivia">
        <input type="checkbox" name="trivia" id="trivia" />
        <label htmlFor="trivia">Subscribe to trivia</label>
      </div>
    </footer>
  );
}

function FooterNav() {
  return (
    <div className="flex py-4 px-8 flex-col md:flex-row gap-4">
      <div className="flex flex-col gap-4 md:flex-row items-center">
        <figure className="h-[56px] w-[56px] md:h-[80px] md:w-[80px]">
          <img className="w-full" src="/logo.svg" alt="Lemon Yellow LLP logo" />
        </figure>
        <div className="">
          <h1 className="text-4xl lg:mt md:text-[64px] text-white">
            Lemon Yellow
          </h1>
          <div className="flex items-center gap-[7px] mt-2">
            <p className="text-white content-start">
              Made with love, from India
            </p>
            <svg
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 16C9.19033 16 9.46224 15.878 9.66163 15.7647C14.7644 12.6275 18 8.97604 18 5.26362C18 2.17865 15.7976 0 12.9517 0C11.247 0 9.92175 0.875582 9.08979 2.22794C9.04916 2.29399 8.95142 2.29366 8.91115 2.2274C8.09418 0.883072 6.75241 0 5.04834 0C2.20242 0 0 2.17865 0 5.26362C0 8.97604 3.23565 12.6275 8.34743 15.7647C8.53776 15.878 8.80967 16 9 16Z"
                fill="#EF6351"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="sm:ml-auto flex flex-col justify-center gap-2">
        <p className="text-white text-center md:text-start">
          We're quite social savvy
        </p>
        <div className="flex flex-wrap justify-center items-center gap-1.5">
          <a href="https://www.instagram.com/lemonyellowllp/" target="_blank" title="Icon of Instagram">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 md:w-8 md:h-8 icon"
            >
              <g clipPath="url(#clip0_1977_5009)">
                <path
                  d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                  fill="#0E3530"
                  className="hover-bg"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21.066 8.66675H10.9327C9.59935 8.66675 8.66602 9.73341 8.66602 10.9334V21.0667C8.66602 22.4001 9.73268 23.3334 10.9327 23.3334H21.066C22.3993 23.3334 23.3327 22.2667 23.3327 21.0667V10.9334C23.3327 9.73341 22.266 8.66675 21.066 8.66675ZM15.9993 19.2001C14.266 19.2001 12.7993 17.7334 12.7993 16.0001C12.7993 14.2667 14.266 12.8001 15.9993 12.8001C17.7327 12.8001 19.1993 14.2667 19.1993 16.0001C19.1993 17.7334 17.7327 19.2001 15.9993 19.2001ZM20.266 12.9334C19.7327 12.9334 19.3327 12.5334 19.3327 12.0001C19.3327 11.4667 19.7327 11.0667 20.266 11.0667C20.7993 11.0667 21.1993 11.4667 21.1993 12.0001C21.1993 12.5334 20.7993 12.9334 20.266 12.9334Z"
                  fill="#99DDD3"
                  className="hover-yellow"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_1977_5009">
                  <rect width="32" height="32" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </a>

          <a href="https://twitter.com/LemonYellowLLP" target="_blank" title="Icon of Twitter">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 md:w-8 md:h-8 icon"
            >
              <g clipPath="url(#clip0_1977_5014)">
                <path
                  d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                  fill="#0E3530"
                  className="hover-bg"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.3331 22C18.9331 22 21.8665 17.4667 21.8665 13.4667C21.8665 13.3333 21.8665 13.2 21.8665 13.0667C22.3998 12.6667 22.9331 12.1333 23.3331 11.4667C22.7998 11.7333 22.2665 11.8667 21.5998 12C22.2665 11.6 22.6665 11.0667 22.9331 10.2667C22.3998 10.6667 21.7331 10.8 21.0665 10.9333C20.5331 10.4 19.7331 10 18.9331 10C17.3331 10 15.8665 11.3333 15.8665 13.0667C15.8665 13.3333 15.8665 13.6 15.9998 13.7333C13.4665 13.6 11.3331 12.4 9.73314 10.5333C9.46647 11.0667 9.33314 11.6 9.33314 12.1333C9.33314 13.2 9.86647 14.1333 10.6665 14.6667C10.1331 14.6667 9.73314 14.5333 9.33314 14.2667C9.33314 15.7333 10.3998 16.9333 11.7331 17.2C11.4665 17.3333 11.1998 17.3333 10.9331 17.3333C10.7998 17.3333 10.5331 17.3333 10.3998 17.3333C10.7998 18.5333 11.8665 19.4667 13.1998 19.4667C12.1331 20.2667 10.9331 20.8 9.46647 20.8C9.1998 20.8 8.93314 20.8 8.7998 20.8C9.9998 21.4667 11.5998 22 13.3331 22Z"
                  fill="#99DDD3"
                  className="hover-yellow"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_1977_5014">
                  <rect width="32" height="32" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </a>
          <a href="https://in.linkedin.com/company/lemonyellow-net" target="_blank" title="Icon of LinkedIn">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 md:w-8 md:h-8 icon"
            >
              <g clipPath="url(#clip0_1977_5018)">
                <path
                  d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                  fill="#0E3530"
                  className="hover-bg"
                ></path>
                <path
                  d="M11.9988 13.4666H8.79883V22.9332H11.9988V13.4666Z"
                  fill="#99DDD3"
                  className="hover-yellow"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23.3329 22.9333H20.1329V17.8666C20.1329 16.5333 19.7329 15.7333 18.5329 15.7333C17.5996 15.7333 17.1996 16.2666 16.9329 16.9333C16.7996 17.1999 16.7996 17.4666 16.7996 17.7333V23.0666H13.5996C13.5996 23.0666 13.5996 14.5333 13.5996 13.5999H16.7996V14.9333C17.1996 14.2666 17.9996 13.3333 19.5996 13.3333C21.7329 13.3333 23.1996 14.6666 23.1996 17.5999L23.3329 22.9333Z"
                  fill="#99DDD3"
                  className="hover-yellow"
                ></path>
                <path
                  d="M10.266 12.2666C11.1497 12.2666 11.866 11.5503 11.866 10.6667C11.866 9.78299 11.1497 9.06665 10.266 9.06665C9.38236 9.06665 8.66602 9.78299 8.66602 10.6667C8.66602 11.5503 9.38236 12.2666 10.266 12.2666Z"
                  fill="#99DDD3"
                  className="hover-yellow"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_1977_5018">
                  <rect width="32" height="32" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </a>
          <a href="https://medium.com/@lemonyellowllp" target="_blank" title="Icon of Medium">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 md:w-8 md:h-8 icon"
            >
              <g clipPath="url(#clip0_1977_5025)">
                <path
                  d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                  fill="#0E3530"
                  className="hover-bg"
                ></path>
                <path
                  d="M18.9336 9.6001V20.5334L16.9336 22.4001H24.5336L22.4003 20.5334V11.0668L24.6669 9.6001H18.9336Z"
                  fill="#99DDD3"
                  className="hover-yellow"
                ></path>
                <path
                  d="M10.2668 12.4001H9.4668V19.7335H10.2668V12.4001Z"
                  fill="#99DDD3"
                  className="hover-yellow"
                ></path>
                <path
                  d="M9.86732 18.9333L11.2007 20.6667L12.4007 22.4H9.86732H7.33398L8.66732 20.6667L9.86732 18.9333Z"
                  fill="#99DDD3"
                  className="hover-yellow"
                ></path>
                <path
                  d="M16.9335 17.4668L12.6668 9.6001H7.4668L7.60013 9.73343L14.6668 22.4001H14.9335L16.9335 17.6001V17.4668Z"
                  fill="#99DDD3"
                  className="hover-yellow"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.6668 18.1334L15.4668 17.6001L18.9335 9.6001L20.1335 10.0001L16.6668 18.1334Z"
                  fill="#99DDD3"
                  className="hover-yellow"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_1977_5025">
                  <rect width="32" height="32" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </a>

          <a href="https://youtube.com/@lemonyellowllp" target="_blank" title="Icon of YouTube">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 md:w-8 md:h-8 icon"
            >
              <g clipPath="url(#clip0_1977_5037)">
                <path
                  d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
                  fill="#0E3530"
                  className="hover-bg"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21.8663 10.1333H10.133C8.53301 10.1333 7.33301 11.3333 7.33301 12.9333V19.2C7.33301 20.8 8.53301 22 10.133 22H21.8663C23.4663 22 24.6663 20.8 24.6663 19.2V12.8C24.6663 11.3333 23.4663 10.1333 21.8663 10.1333ZM13.733 18.6666V13.3333L18.2663 16L13.733 18.6666Z"
                  fill="#99DDD3"
                  className="hover-yellow"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_1977_5037">
                  <rect width="32" height="32" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </a>
          <a href="https://in.pinterest.com/lemonyellowllp/" target="_blank" title="Icon of Pinterest">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 md:w-8 md:h-8 icon"
            >
              <g clipPath="url(#clip0_1977_5041)">
                <path
                  d="M15.834 32C24.6705 32 31.834 24.8366 31.834 16C31.834 7.16344 24.6705 0 15.834 0C6.99743 0 -0.166016 7.16344 -0.166016 16C-0.166016 24.8366 6.99743 32 15.834 32Z"
                  fill="#0E3530"
                  className="hover-bg"
                ></path>
                <path
                  d="M15.8903 7.32275C11.0903 7.32275 7.22363 11.1894 7.22363 15.9894C7.22363 19.7228 9.4903 22.7894 12.6903 24.1228C12.557 23.4561 12.557 22.3894 12.6903 21.5894C12.8236 20.9228 13.757 17.3228 13.757 17.3228C13.757 17.3228 13.4903 16.7894 13.4903 15.9894C13.4903 14.7894 14.157 13.8561 15.0903 13.8561C15.8903 13.8561 16.157 14.3894 16.157 15.0561C16.157 15.8561 15.6236 16.9228 15.4903 17.9894C15.2236 18.7894 15.8903 19.5894 16.8236 19.5894C18.4236 19.5894 19.4903 17.9894 19.4903 15.5894C19.4903 13.4561 18.0236 12.1228 15.8903 12.1228C13.4903 12.1228 12.0236 13.9894 12.0236 15.8561C12.0236 16.6561 12.2903 17.4561 12.6903 17.8561C12.8236 17.9894 12.8236 17.9894 12.6903 18.1228C12.6903 18.3894 12.4236 18.9228 12.4236 19.0561C12.4236 19.1894 12.2903 19.1894 12.157 19.1894C11.0903 18.6561 10.4236 17.0561 10.4236 15.8561C10.4236 13.0561 12.4236 10.6561 16.157 10.6561C19.2236 10.6561 21.4903 12.7894 21.4903 15.7228C21.4903 18.6561 19.6236 21.0561 16.957 21.0561C16.0236 21.0561 15.2236 20.6561 14.957 20.1228C14.957 20.1228 14.557 21.7228 14.4236 22.1228C14.2903 22.9228 13.757 23.8561 13.357 24.3894C14.157 24.6561 15.0903 24.7894 15.8903 24.7894C20.6903 24.7894 24.557 20.9228 24.557 16.1228C24.557 11.3228 20.557 7.32275 15.8903 7.32275Z"
                  fill="#99DDD3"
                  className="hover-yellow"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_1977_5041">
                  <rect width="32" height="32" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
