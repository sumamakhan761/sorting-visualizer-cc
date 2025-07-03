"use client";

import { Select } from "@/components/Input/Select";
import { Slider } from "@/components/Input/Slider";
import { useSortingAlgorithmContext } from "@/context/Visualizer";
import { SortingAlgorithmType } from "@/lib/types";
import {
  algorithmOptions,
  generateAnimationArray,
  sortingAlgorithmsData,
} from "@/lib/utils";
import { useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { FaPlayCircle } from "react-icons/fa";
import { FiBarChart2 } from "react-icons/fi";
import { RxReset } from "react-icons/rx";

export default function Home() {
  const {
    arrayToSort,
    isSorting,
    setAnimationSpeed,
    animationSpeed,
    selectedAlgorithm,
    setSelectedAlgorithm,
    requiresReset,
    resetArrayAndAnimation,
    runAnimation,
  } = useSortingAlgorithmContext();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAlgorithm(e.target.value as SortingAlgorithmType);
  };

  const handlePlay = () => {
    if (requiresReset) {
      resetArrayAndAnimation();
      return;
    }

    generateAnimationArray(
      selectedAlgorithm,
      isSorting,
      arrayToSort,
      runAnimation
    );
  };
  const [showInfo, setShowInfo] = useState(true)
  return (
    <main className="absolute top-0 h-screen w-screen z-[-2] bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900">
      <div className="flex h-full justify-center">
        <div
          id="content-container"
          className="flex max-w-[1020px] w-full flex-col lg:px-0 px-4 mt-5"
        >
          {/* Header Section */}
          <div className="h-[66px] relative flex flex-col sm:flex-row items-center justify-between w-full sm:h-auto py-4 sm:py-0">
            {/* Title */}
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <FiBarChart2 className="h-5 w-5 sm:h-8 sm:w-8 text-system-purple60" />
              <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-system-purple50 to-system-purple60">
                Sorting Visualizer
              </h1>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
              <Slider
                isDisabled={isSorting}
                value={animationSpeed}
                handleChange={(e) => setAnimationSpeed(Number(e.target.value))}
              />
              <Select
                options={algorithmOptions}
                defaultValue={selectedAlgorithm}
                onChange={handleSelectChange}
                isDisabled={isSorting}
              />
              <button
                className="flex items-center justify-center"
                onClick={handlePlay}
              >
                {requiresReset ? (
                  <RxReset className="text-gray-400 h-6 w-6 sm:h-8 sm:w-8" />
                ) : (
                  <FaPlayCircle className="text-system-green60 h-6 w-6 sm:h-8 sm:w-8" />
                )}
              </button>
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="rounded-full bg-gray-700 hover:bg-gray-600 text-white border-0"
              >
                <BiInfoCircle className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>
            </div>

            {/* Info Panel */}
            {showInfo && (
              <div className="absolute top-[200%] left-0 w-full *:">
                <div className="flex flex-col sm:flex-row w-full text-gray-400 p-2 sm:p-4 rounded border border-system-purple20 bg-system-purple80 bg-opacity-10 gap-3 sm:gap-6">
                  <div className="flex flex-col items-start justify-start w-full sm:w-3/4">
                    <h3 className="text-base sm:text-lg">
                      {sortingAlgorithmsData[selectedAlgorithm].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-grey-500 pt-1 sm:pt-2">
                      {sortingAlgorithmsData[selectedAlgorithm].description}
                    </p>
                  </div>

                  <div className="flex flex-col items-start justify-start w-full sm:w-1/4 gap-1 sm:gap-2">
                    <h3 className="text-base sm:text-lg">Time Complexity</h3>
                    <div className="flex flex-col gap-1 sm:gap-2">
                      <p className="flex w-full text-xs sm:text-sm text-gray-500">
                        <span className="w-24 sm:w-28">Worst Case:</span>
                        <span>{sortingAlgorithmsData[selectedAlgorithm].worstCase}</span>
                      </p>
                      <p className="flex w-full text-xs sm:text-sm text-gray-500">
                        <span className="w-24 sm:w-28">Average Case:</span>
                        <span>{sortingAlgorithmsData[selectedAlgorithm].averageCase}</span>
                      </p>
                      <p className="flex w-full text-xs sm:text-sm text-gray-500">
                        <span className="w-24 sm:w-28">Best Case:</span>
                        <span>{sortingAlgorithmsData[selectedAlgorithm].bestCase}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Visualization Section */}
          <div className="relative h-[calc(100vh-120px)] sm:h-[calc(100vh-66px)] w-full mt-10">
            <div className="absolute bottom-[32px] w-full mx-auto left-0 right-0 flex justify-center items-end">
              {arrayToSort.map((value, index) => (
                <div
                  key={index}
                  className="array-line relative w-[2px] sm:w-1 mx-[1px] sm:mx-0.5 shadow-lg opacity-70 rounded-lg default-line-color"
                  style={{ height: `${value}px` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
