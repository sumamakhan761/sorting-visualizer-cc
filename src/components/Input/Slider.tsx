import { MAX_ANIMATION_SPEED, MNI_ANIMATION_SPEED } from "@/lib/utils";

export const Slider = ({
  min = MNI_ANIMATION_SPEED,
  max = MAX_ANIMATION_SPEED,
  step = 10,
  value,
  handleChange,
  isDisabled = false,
}: {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
}) => {
  return (
    <div className="flex gap-2 items-center justify-center w-full max-w-[180px]">
      <span className="text-xs sm:text-sm font-medium text-gray-200 whitespace-nowrap">Slow</span>
      <input
        disabled={isDisabled}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => handleChange(e)}
        className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      <span className="text-xs sm:text-sm font-medium text-gray-200 whitespace-nowrap">Fast</span>
    </div>
  );
};
