import { Button, Carousel, Col, ConfigProvider, Row, Tooltip } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";
import styles from "./carousel.module.scss";
import { carouselHorizontalList } from "@/mock/carousel/carouselHorizontal";
import general from "@/assets/images/carousel/general.jpg";
import custom from "@/assets/images/carousel/custom.jpg";

function CarouselHorizontal() {
  return (
    <div className={styles["carousel-horizontal"]}>
      <ConfigProvider
        theme={{
          components: {
            Carousel: {
              arrowSize: 20,
              arrowOffset: -6,
              dotOffset: 0,
            },
          },
        }}
      >
        <Carousel
          arrows={carouselHorizontalList.length > 9}
          dots={carouselHorizontalList.length > 9}
        >
          {/* 根据列表总数计算需使用的走马灯盒子数(每页9个，计算时向上取整) */}
          {carouselHorizontalList.length &&
            Array.from({
              length: Math.ceil(carouselHorizontalList.length / 9),
            }).map((_, index) => (
              <div key={index} className={styles.box}>
                {/* 从carouselHorizontalList中截取要展示的数据(0-8, 9-17...) */}
                <Row gutter={[16, 16]}>
                  {carouselHorizontalList
                    .slice(index * 9, (index + 1) * 9)
                    .map((item) => (
                      <Col key={item.id} span={8}>
                        <div key={item.id} className={styles.item}>
                          {/* 卡片右上角旗帜（绝对定位） */}
                          <img
                            className={styles.img}
                            src={item.type === "1" ? general : custom}
                            alt="类型"
                          />
                          <div className={styles.top}>
                            <div className={styles.icon}>
                              <FileSearchOutlined />
                            </div>
                            <div className={styles.text}>
                              {item.title.length > 16 ? (
                                <Tooltip title={item.title}>
                                  <div className={styles.title}>
                                    {item.title}
                                  </div>
                                </Tooltip>
                              ) : (
                                <div className={styles.title}>{item.title}</div>
                              )}
                              <div className={styles.description}>
                                {item.description}
                              </div>
                            </div>
                          </div>
                          <div className={styles.bottom}>
                            <Button
                              style={{ height: "100%" }}
                              type="link"
                              block
                            >
                              查看报表
                            </Button>
                          </div>
                        </div>
                      </Col>
                    ))}
                </Row>
              </div>
            ))}
        </Carousel>
      </ConfigProvider>
    </div>
  );
}

export default CarouselHorizontal;
