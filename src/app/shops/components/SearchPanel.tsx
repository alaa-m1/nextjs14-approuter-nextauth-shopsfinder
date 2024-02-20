"use client";
import React, { useCallback, useMemo, useState } from "react";
import _ from "lodash";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdOutlineSearch } from "react-icons/md";

export const SearchPanel = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const [searchValue, setSearchValue] = useState(() => {
    const searchValue = searchParams?.get("search");
    if (!_.isNull(searchValue)) return searchValue;
    else return "";
  });

  const handleApplySearch = useCallback(() => {
    if (!searchValue) {
      //   if (searchParams?.has("search")) searchParams?.delete("search");
      //   searchParams?.set("search", searchValue);
      router.push(pathname + "?" + createQueryString("search", ""));
    } else {
      //   searchParams.set("search", searchValue);
      router.push(pathname + "?" + createQueryString("search", searchValue));
    }
  }, [createQueryString, pathname, router, searchValue]);

  const searchDebounceFn = useMemo(
    () =>
      _.debounce((searchValue: string) => {
        if (!searchValue) {
          //   if (searchParams?.has("search")) searchParams.delete("search");
          router.push(pathname + "?" + createQueryString("search", ""));
        } else {
          router.push(
            pathname + "?" + createQueryString("search", searchValue)
          );
        }
      }, 1000),
    [createQueryString, pathname, router]
  );

  const handleDebouncedSearchChange = useCallback(
    (searchValue: string) => searchDebounceFn(searchValue),
    [searchDebounceFn]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newSearch = e.target.value;
      setSearchValue(newSearch);
      if (_.isEmpty(newSearch)) {
        // if (searchParams?.has("search")) searchParams.delete("search");
        router.push(pathname + "?" + createQueryString("search", ""));
      }
      handleDebouncedSearchChange(newSearch);
    },
    [createQueryString, handleDebouncedSearchChange, pathname, router]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      if (e.key === "Enter") {
        if (_.isEmpty(target.value)) {
          router.push(pathname + "?" + createQueryString("search", ""));
        } else {
          router.push(
            pathname + "?" + createQueryString("search", target.value)
          );
        }
      }
    },
    [createQueryString, pathname, router]
  );
  return (
    <div className="w-full shadow-sm flex justify-center">
      <div className="relative p-1">
        <label htmlFor="shops-search-input">
          Search for your favorite shops: &nbsp;
        </label>
        <input
          id="shops-search-input"
          type="search"
          value={searchValue}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          data-testid="FilterPanel-SearchForProducts-text-search"
          className="pl-[5px] pr-[20px] py-[3px] outline-none"
        />
        <MdOutlineSearch
          onClick={handleApplySearch}
          className="size-5 absolute top-[10px] right-[5px] cursor-pointer"
        />
      </div>
    </div>
  );
};
