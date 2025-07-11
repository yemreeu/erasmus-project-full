import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Typography,
  Image,
  Row,
  Col,
  Button,
  Dropdown,
} from "antd";
import {
  PictureOutlined,
  HomeOutlined,
  DownOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

type MenuKey = "home" | "events";

const imageList = Array.from(
  { length: 18 },
  (_, i) => `/images/photo${i + 3}.jpeg`
);

const HomeContent: React.FC<{ onNavigate: (page: MenuKey) => void }> = ({
  onNavigate,
}) => (
  <div>
    <div
      style={{
        padding: 40,
        textAlign: "center",
        backgroundColor: "#fafafa",
        borderRadius: 8,
        marginBottom: 40,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <img
          src="/images/erasmus.png"
          alt="Logo"
          style={{ height: 50, width: "auto" }}
        />
      </span>
      <Title level={2}>Liv Koleji Erasmus+ Projesine Hoşgeldiniz!</Title>
      <Paragraph
        style={{
          maxWidth: 600,
          margin: "auto",
          fontSize: 16,
          color: "#555",
          lineHeight: 1.6,
        }}
      >
        Öğrencilerimizin spor ve sağlıklı yaşam bilinci için gerçekleştirdiği
        etkinlikleri keşfedin.
      </Paragraph>
      <Button
        type="primary"
        size="large"
        style={{ marginTop: 20 }}
        onClick={() => onNavigate("events")}
      >
        Etkinliklere Git
      </Button>
    </div>

    <div
      style={{
        maxWidth: 700,
        margin: "auto",
        textAlign: "center",
        cursor: "pointer",
      }}
      onClick={() => onNavigate("events")}
    >
      <Title level={3}>
        Erasmus+ Project - A Happy Life in a Healthy Environment
      </Title>

      <Paragraph>
        LİV Koleji öğrencileri, Erasmus+ projesi kapsamında "I Do Sports, Not
        Virtual!" etkinliğini başarıyla gerçekleştirdiler. Etkinlikte
        öğrenciler, velileriyle birlikte çeşitli sportif faaliyetlere katılarak
        hem fiziksel aktivitenin önemine dikkat çektiler hem de sağlıklı yaşam
        bilincini güçlendirdiler. Bu anlamlı etkinlik, aile katılımını teşvik
        ederken, dijital bağımlılığa karşı farkındalık oluşturmayı da hedefledi.
      </Paragraph>
    </div>
  </div>
);

const App = () => {
  const [selectedMenu, setSelectedMenu] = useState<MenuKey>("home");

  const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
  };

  const width = useWindowWidth();
  const isMobile = width < 375;

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.height = "100%";
    document.body.style.width = "100%";
    document.body.style.backgroundColor = "#f0f2f5";

    document.documentElement.style.margin = "0";
    document.documentElement.style.padding = "0";
    document.documentElement.style.height = "100%";
    document.documentElement.style.width = "100%";
  }, []);

  const handleMenuClick = (e: { key: string }) => {
    setSelectedMenu(e.key as MenuKey);
  };

  // Dropdown içindeki menü öğeleri
  const dropdownMenu = (
    <Menu onClick={handleMenuClick} selectedKeys={[selectedMenu]}>
      <Menu.Item
        key="home"
        icon={<HomeOutlined />}
        style={{ borderRadius: 12, minWidth: 120 }}
      >
        Anasayfa
      </Menu.Item>
      <Menu.Item
        key="events"
        icon={<PictureOutlined />}
        style={{ borderRadius: 12, minWidth: 120 }}
      >
        Etkinlikler
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout
      style={{
        minHeight: "100vh",
        width: "100vw",
        padding: 0,
        margin: 0,
        backgroundColor: "#f0f2f5",
      }}
    >
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
          flexWrap: "nowrap",
        }}
      >
        <div
          onClick={() => setSelectedMenu("home")}
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            gap: isMobile ? 0 : 8,
            cursor: "pointer",
            paddingTop: isMobile ? 12 : 0,
          }}
        >
          {/* Logo Div */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 0, // Logo ve text arasındaki boşluğu kaldır
              padding: "16px 0", // Üst ve alttan sabit boşluk
            }}
          >
            <img
              src="/images/logo.png"
              alt="Logo"
              style={{
                height: 24,
                width: "auto",
                margin: 0, // Tüm margin'ları kaldır
              }}
            />
            <span
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 18,
                whiteSpace: "nowrap",
                textAlign: "left",
                margin: 0, // Margin'ı kaldır
                lineHeight: 1, // Line height'ı minimize et
              }}
            >
              Erasmus+ Project
            </span>
          </div>
        </div>

        {/* Dropdown menü sağda */}
        <Dropdown
          overlay={dropdownMenu}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button
            type="text"
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 14,
            }}
          >
            Menü <DownOutlined />
          </Button>
        </Dropdown>
      </Header>

      <Content style={{ padding: 0, margin: 0, width: "100%" }}>
        <div
          style={{
            padding: 24,
            maxWidth: 1200,
            margin: "0 auto",
            boxSizing: "border-box",
            backgroundColor: "white",
            minHeight: "calc(100vh - 64px - 70px)",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          {selectedMenu === "home" && (
            <HomeContent onNavigate={setSelectedMenu} />
          )}

          {selectedMenu === "events" && (
            <>
              <Title level={3} style={{ marginBottom: 24 }}>
                Local Activity No:7 "I do sports, not virtual!"
              </Title>

              <Paragraph>
                LİV Koleji öğrencileri, Erasmus+ projesi kapsamında "I Do
                Sports, Not Virtual!" etkinliğini başarıyla gerçekleştirdiler.
                Etkinlikte öğrenciler, velileriyle birlikte çeşitli sportif
                faaliyetlere katılarak hem fiziksel aktivitenin önemine dikkat
                çektiler hem de sağlıklı yaşam bilincini güçlendirdiler. Bu
                anlamlı etkinlik, aile katılımını teşvik ederken, dijital
                bağımlılığa karşı farkındalık oluşturmayı da hedefledi.
              </Paragraph>

              <Row gutter={[16, 16]}>
                {imageList.map((src, i) => (
                  <Col key={i} xs={24} sm={12} md={8} lg={6} xl={4}>
                    <Image
                      src={src}
                      alt={`photo${i + 3}`}
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                        borderRadius: 6,
                        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                      }}
                      preview={true}
                    />
                  </Col>
                ))}
              </Row>
            </>
          )}
        </div>
      </Content>

      <Footer style={{ textAlign: "center", fontSize: 12, color: "#999" }}>
        Copyright © {new Date().getFullYear()} Liv College Erasmus+ Project. All
        rights reserved.
      </Footer>
    </Layout>
  );
};

export default App;