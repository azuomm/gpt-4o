"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { languages } from "~/config";
import { useCommonContext } from "~/context/common-context";
import LoadingModal from "./LoadingModal";
import Image from "next/image";
import GeneratingModal from "~/components/GeneratingModal";

const navigation = {
  topMenu: [
    { name: "Trends", href: "/trends" },
    { name: "Use Cases", href: "/videos" },
    { name: "Playground", href: "/playground" },
    { name: "Works", href: "/works" },
  ],
  social: [
    {
      name: "twitter",
      href: "https://twitter.com/azuomm",
      icon: (props) => (
        <svg fill="#fff" viewBox="0 0 24 24" {...props}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
        </svg>
      ),
    },
  ],
};

export default function Header({ locale = "", page = "", indexLanguageText }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setShowGeneratingModal } = useCommonContext();
  const { setShowLoadingModal } = useCommonContext();

  const checkLocalAndLoading = (lang) => {
    if (locale != lang) {
      setShowLoadingModal(true);
    }
  };

  return (
    <header className="sticky top-0 bg-[#020d24] z-20 w-full">
      <LoadingModal loadingText={indexLanguageText.loadingText} />
      <GeneratingModal generatingText={indexLanguageText.generateText} />
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a
            href={`/${locale}`}
            className="-m-1.5 p-1.5"
            onClick={() => setShowLoadingModal(true)}
          >
            <Image
              className="h-8 w-auto"
              src="/appicon.svg"
              alt="gpt-4o.wiki"
              width={32}
              height={32}
            />
          </a>
          <a
            href={`/${locale}`}
            className="-m-1.5 ml-0.5 p-1.5"
            onClick={() => setShowLoadingModal(true)}
          >
            <Image
              className="h-8 w-auto"
              src="/gpt-4o.svg"
              width={32}
              height={24}
              alt="gpt-4o.wiki"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.topMenu.map((item) => (
            <a
              key={item.name}
              href={`/${locale}${item.href}`}
              onClick={() => setShowLoadingModal(true)}
              className="text-sm font-semibold leading-6 text-white hover:text-blue-500"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="flex flex-1 justify-end mr-2">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-500 hover:text-gray-400"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 border border-[rgba(255,255,255,0.5)] rounded-md px-3 py-2 text-sm font-semibold text-white hover:border-[rgba(255,255,255,0.9)]">
              <GlobeAltIcon className="w-5 h-5 text-white" />
              {locale == "default" ? "EN" : locale.toUpperCase()}
              <ChevronDownIcon
                className="-mr-1 h-5 w-5 text-white"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-26 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {languages.map((item) => {
                  let hrefValue = `/${item.lang}`;
                  if (page) {
                    hrefValue = `/${item.lang}/${page}`;
                  }
                  return (
                    <Menu.Item key={item.lang}>
                      <Link
                        href={hrefValue}
                        onClick={() => checkLocalAndLoading(item.lang)}
                      >
                        <span
                          className={
                            "text-gray-700 block px-4 py-2 text-sm hover:text-[#2d6ae0]"
                          }
                        >
                          {item.language}
                        </span>
                      </Link>
                    </Menu.Item>
                  );
                })}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a
              href={`/${locale}`}
              className="-m-1.5 p-1.5"
              onClick={() => setShowLoadingModal(true)}
            >
              <Image
                className="h-8 w-auto"
                src="/appicon.svg"
                alt="sorawebui.com"
                width={32}
                height={32}
              />
            </a>
            <a
              href={`/${locale}`}
              className="-m-1.5 ml-0.5 p-1.5"
              onClick={() => setShowLoadingModal(true)}
            >
              <Image
                className="h-8 w-auto"
                src="/sorawebui.svg"
                width={32}
                height={24}
                alt="sorawebui.com"
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.topMenu.map((item) => (
                  <a
                    key={item.name}
                    href={`/${locale}${item.href}`}
                    onClick={() => setShowLoadingModal(true)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:text-blue-500"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
