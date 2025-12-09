import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../context/DataContext";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

export default function MotionSlider({ projectId, carouselMargin = 40, fontSize = "16px", opacity = 1, drag = "x" }) {
  useEffect(() => {
    AOS.init({
      duration: 1200,       // Animation duration
      offset: 100,          // How far from viewport the animation should trigger
      delay: 100,           // Delay between elements
      once: false,          // Run every time you scroll up/down
      mirror: true,         // Run again when scrolling back up
      easing: "ease-in-out", // Smooth easing
      anchorPlacement: "top-bottom", // Where the trigger happens
    });
  }, []);
  const carouselRef = useRef();
  const [width, setWidth] = useState(0);
  const { projectData } = useData();
  // filter the project using slug key
  const project = projectData.find((item) => item.slug === projectId);
  const mediaItems = project?.content;
  useEffect(() => {
    if (carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth;
      const offsetWidth = carouselRef.current.offsetWidth;
      setWidth(scrollWidth - offsetWidth);
    }
  }, [mediaItems]);

  return (
    <div className="p-0">
      <motion.div
        ref={carouselRef}
        initial={{ marginBottom: 40 }}
        animate={{ marginBottom: carouselMargin }}
        transition={{ duration: 0.5 }}
        whileTap={{ cursor: "grabbing" }}
        className="carouselMargin"
      >
        <AnimatePresence>
          <motion.div
            className="inner-carousel mb-5 d-flex"
            drag={drag}
            dragConstraints={{ right: 0, left: -width }}
          >

            {project && (
              <motion.div className="item firstItem"  data-aos="fade-right" data-aos-delay="200"  style={{ width: "25%" }}>
                <div className="project_box" style={{padding: "5px"}}>
                  {project.project_main_image && (
                    <motion.img
                      src={`${import.meta.env.VITE_IMAGE_URL}/project-thumbnails/${project.project_thumbnail}`}
                      alt={project.project_name}
                      className="img-fluid rounded mb-2"
                      style={{ cursor: "zoom-in" }}
                      whileHover={{ scale: 1.2 }}
                    />
                  )}

                  {/* Project title & address */}
                  {project.project_name && <h3 style={{ fontSize }}>{
                      (() => {
                        const words = project.project_name.trim().split(" ");
                        if (words.length > 2) {
                          return (
                            <>
                              {words[0] + " " + words[1]}
                              <br />
                              {words[2]}
                            </>
                          );
                        }
                        return project.project_name; // fallback
                      })()
                    }</h3>}
                  {project.project_address && <p style={{ fontSize }}>{project.project_address}</p>}

                  {/* Project details */}
                  <motion.div
                    className="details"
                    initial={{ opacity: opacity }}
                    animate={{ opacity: opacity }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    {
                      project.category_name && (
                        <>
                          <p className="head">Service</p>
                          <p className="head2">{project.category_name}</p>
                        </>
                      )
                    }
                    {
                      project.client_name && (
                        <>
                          <p className="head">Client</p>
                          <p className="head2">{project.client_name}</p>
                        </>
                      )
                    }
                    {
                      project.site_area && (
                        <>
                          <p className="head">Site Area</p>
                          <p className="head2">{project.site_area}</p>
                        </>
                      )
                    }
                    {
                      project?.tags && (
                        <>
                          <p className="head">Tags</p>
                          <p className="head2">{project.tags?.title}</p>
                        </>
                      )
                    }
                    {
                      project.built_up_area && (
                        <>
                          <p className="head">Built-up</p>
                          <p className="head2">{project.built_up_area}</p>
                        </>
                      )
                    }
                    {
                      project.project_status && (
                        <>
                          <p className="head">Status</p>
                          <p className="head2">{project.project_status.charAt(0).toUpperCase() + project.project_status.slice(1).toLowerCase()}</p>
                        </>
                      )
                    }
                    </motion.div>
                </div>
              </motion.div>
            )}

            {project?.project_main_image && (
              <motion.div className="item" style={{ width: "25%", cursor: "zoom-in", padding: "5px" }}>
                <div style={{ width: "100%", overflow: "hidden", borderRadius: "8px" }}>
                  <motion.img
                    src={`${import.meta.env.VITE_IMAGE_URL}/project-images/${project.project_main_image}`}
                    alt={`media-project_main_image`}
                    style={{ width: "100%", height: "300px", objectFit: "cover" }}
                    whileHover={{ scale: 1.1 }}
                  />
                </div>
              </motion.div>
            )}
            {mediaItems.map((item, index) => (
              <motion.div key={index} className={`item ${item?.type === 'description' ? 'description' : 'image'}`}  data-aos="fade-left" data-aos-delay="200"  style={{
                  width: item?.type === "description" ? "20%" : (item?.width == '100' ? '25%' : `${item?.width}%`),
                  maxWidth: item?.type === "description" ? "15%" : (item?.width == '100' ? '25%' : `${item?.width}%`),
                  minWidth: item?.type === "description" ? "5%" : (item?.width == '100' ? '25%' : `${item?.width}%`),
                  padding: "5px",
                }}>
                {item?.type === "image" && item?.image && (
                  <div 
                  style={{
                    width: "100%",
                    overflow: "hidden",
                    borderRadius: "8px",
                    background: "#f0f0f0",                    
                  }}>
                    <motion.img
                      src={`${import.meta.env.VITE_IMAGE_URL}/${item?.image}`}
                      alt={`media-${index}`}
                      style={{ width: "100%", height: "300px", objectFit: "cover" }}
                      whileHover={{ scale: 1.05 }}
                    />
                  </div>
                )}

                {item?.type === "video" && item?.video && (
                  <div style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    overflow: "hidden",
                    borderRadius: "8px",
                    background: "#000",
                  }}>
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{ width: "100%", height: "80%", objectFit: "cover" }}
                    >
                      <source src={`${import.meta.env.VITE_IMAGE_URL}/${item?.video}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                {item?.type === "description" && item?.description && (
                  <div style={{
                    width: "auto",
                    background: "",
                    borderRadius: "8px",
                    fontSize: "8px",
                    lineHeight: "1.6",
                    color: "#333",
                    textAlign: "justify",
                    // minHeight: "150px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                      flexShrink: 0, 
                  }}>
                    {item?.description}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
