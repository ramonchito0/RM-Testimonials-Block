import { __ } from "@wordpress/i18n";
import { clsx } from "clsx";
import {
  InspectorControls,
  useBlockProps,
  MediaUpload,
} from "@wordpress/block-editor";
import {
  PanelBody,
  TextControl,
  Button,
  Modal,
  TextareaControl,
  RangeControl,
  CustomSelectControl,
} from "@wordpress/components";

import { Icon, lineSolid, edit, starFilled } from "@wordpress/icons";

import { useState } from "react";

export default function Edit({ attributes, setAttributes }) {
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const { headingBlock, testimonials = [], style } = attributes;

  const blockProps = useBlockProps({
    className: `${style == "default" ? "rm-bg-secondary bg-secondary" : "rm-bg-white"} rm-testimonials-block`,
  });

  const handleAddTestimonial = () => {
    const newTestimonials = [
      ...testimonials,
      {
        author: "",
        title: "",
        subtitle: "",
        quote: "",
        rating: 5,
        image: "",
      },
    ];
    setAttributes({ testimonials: newTestimonials });
    setOpenModalIndex(newTestimonials.length - 1); // create new testimonial
  };

  const handleChangeTestimonial = (index, field, value) => {
    const newTestimonials = [...testimonials];
    newTestimonials[index] = { ...newTestimonials[index], [field]: value };
    setAttributes({ testimonials: newTestimonials });
  };

  const handleRemoveTestimonial = (index) => {
    const newTestimonials = testimonials.filter((_, i) => i !== index);
    setAttributes({ testimonials: newTestimonials });
  };

  const handleCloseModal = () => {
    const testimonial = testimonials[openModalIndex];
    if (!testimonial.author || !testimonial.quote) {
      // If author or quote is not filled out, remove the testimonial
      handleRemoveTestimonial(openModalIndex);
    }
    setOpenModalIndex(null); // Close the modal after saving
  };

  const designOptions = [
    {
      key: "default",
      name: "Default",
    },
    {
      key: "plain",
      name: "Plain",
    },
  ];

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Settings", "rm-blocks")}>
          <TextControl
            label={__("Title", "rm-blocks")}
            value={headingBlock || __("What They Say", "rm-blocks")}
            onChange={(value) => setAttributes({ headingBlock: value })}
          />
          <hr />
          <div className="rm-space-y-1">
            {testimonials.map((testimonial, index) => (
              <div key={index}>
                {openModalIndex === index && (
                  <Modal
                    title={`Edit Testimonial ${index + 1}`}
                    onRequestClose={handleCloseModal}
                  >
                    <div className="rm-space-y-4">
                      <TextControl
                        label={`${__("Author", "rm-blocks")}`}
                        value={testimonial.author}
                        onChange={(value) =>
                          handleChangeTestimonial(index, "author", value)
                        }
                      />
                      <TextControl
                        label={`${__("Title", "rm-blocks")}`}
                        value={testimonial.title}
                        onChange={(value) =>
                          handleChangeTestimonial(index, "title", value)
                        }
                      />
                      <TextControl
                        label={`${__("Sub Title", "rm-blocks")}`}
                        value={testimonial.subtitle}
                        onChange={(value) =>
                          handleChangeTestimonial(index, "subtitle", value)
                        }
                      />
                      <TextareaControl
                        label={`${__("Quote", "rm-blocks")}`}
                        value={testimonial.quote}
                        onChange={(value) =>
                          handleChangeTestimonial(index, "quote", value)
                        }
                      />
                      <RangeControl
                        label={`${__("Rating", "rm-blocks")}`}
                        value={testimonial.rating}
                        onChange={(value) =>
                          handleChangeTestimonial(index, "rating", value)
                        }
                        min={1}
                        max={5}
                      />
                      <div>
                        <MediaUpload
                          onSelect={(media) =>
                            handleChangeTestimonial(index, "image", media.url)
                          }
                          allowedTypes={["image"]}
                          value={testimonial.image}
                          render={({ open }) => (
                            <Button
                              onClick={open}
                              className="rm-w-full rm-justify-center rm-border rm-border-solid"
                            >
                              {testimonial.image
                                ? __("Replace Image", "rm-blocks")
                                : __("Set Image", "rm-blocks")}
                            </Button>
                          )}
                        />
                        {testimonial.image && (
                          <img
                            src={testimonial.image}
                            alt={__(
                              `Testimonial Image ${testimonial.author}`,
                              "rm-blocks",
                            )}
                            style={{ maxWidth: "80px", marginTop: "10px" }}
                            className="rm-mx-auto"
                          />
                        )}
                      </div>
                      <Button
                        isPrimary
                        onClick={handleCloseModal}
                        className="rm-w-full rm-justify-center"
                      >
                        {__("Done", "rm-blocks")}
                      </Button>
                    </div>
                  </Modal>
                )}

                <div className="rm-border rm-border-solid rm-border-black rm-p-2">
                  <div className="rm-flex rm-items-center rm-justify-between rm-gap-3">
                    <p className="rm-line-clamp-1" title={testimonial.author}>
                      {testimonial.author}
                    </p>
                    <div className="rm-flex rm-gap-2">
                      <Button
                        onClick={() => setOpenModalIndex(index)}
                        title="Edit"
                        className="!rm-h-auto !rm-p-0"
                      >
                        <Icon icon={edit} />
                      </Button>

                      <Button
                        onClick={() => handleRemoveTestimonial(index)}
                        title="Delete"
                        className="!rm-h-auto !rm-p-0"
                      >
                        <Icon icon={lineSolid} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button
            isPrimary
            onClick={handleAddTestimonial}
            className="rm-mt-2 rm-w-full rm-justify-center"
          >
            {__("Add Testimonial", "rm-blocks")}
          </Button>
          <hr />
          <CustomSelectControl
            label="Design"
            options={designOptions}
            onChange={({ selectedItem }) => {
              setAttributes({ style: selectedItem.key });
            }}
            value={designOptions.find((option) => option.key === style)}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className="rm-container rm-flex rm-flex-col rm-gap-14 rm-py-14 lg:rm-py-20 2xl:rm-px-0">
          <h2 className="animate-up rm-mb-20 rm-text-center rm-text-2xl rm-font-bold">
            {headingBlock || __("What They Say", "rm-blocks")}
          </h2>
          <div className="rm-grid rm-grid-cols-1 rm-gap-24 md:rm-grid-cols-2 dark:rm-text-primary-foreground">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={clsx(
                  "",
                  `${style == "default" ? "rm-bg-white" : "bg-secondary rm-bg-secondary"}`,
                  "rm-space-y-8 rm-rounded-3xl  rm-px-8 rm-pb-10 rm-text-center",
                )}
              >
                {testimonial.image && (
                  <div className="-rm-mt-16 rm-flex rm-flex-col rm-items-center rm-gap-4 md:rm-flex-row md:rm-items-end md:rm-justify-between">
                    <img
                      src={testimonial.image}
                      alt={__(
                        `Testimonial Image ${testimonial.author}`,
                        "rm-blocks",
                      )}
                      className="rm-h-32 rm-w-32 rm-rounded-full rm-object-cover"
                    />
                    <div className="rm-flex rm-flex-col rm-items-center rm-gap-2 md:rm-flex-row">
                      <div class="stars flex md:rm-order-last">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, index) => (
                            <Icon
                              key={index}
                              icon={starFilled}
                              size={28}
                              fill="#FABB05"
                            />
                          ),
                        )}
                      </div>
                      <svg
                        width="16px"
                        height="16px"
                        viewBox="-3 0 262 262"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid"
                        fill="#000000"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                            fill="#4285F4"
                          ></path>
                          <path
                            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                            fill="#34A853"
                          ></path>
                          <path
                            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                            fill="#FBBC05"
                          ></path>
                          <path
                            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                            fill="#EB4335"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  </div>
                )}

                <p className="rm-text-xl">{testimonial.quote}</p>
                <div>
                  <p className="rm-text-base rm-font-bold">
                    {testimonial.author}
                  </p>
                  <p className="rm-text-sm">{testimonial.title}</p>
                  <p className="rm-text-sm">{testimonial.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
